import * as admin from "firebase-admin";
import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";
import { JTag } from "../../types";

export default async function retrieveTags(
  event: APIGatewayProxyEvent,
  _context: any,
  callback: APIGatewayProxyCallback
) {
  try {
    // If no authorisation header is provided reject
    if (!event.headers.authorization) {
      return callback(null, {
        statusCode: 401,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Unauthorised, no token was provided" })
      });
    }

    // extract post id from query string
    const queryParam = event?.queryStringParameters;

    if (!queryParam?.uid || !queryParam?.journalId) {
      return callback(null, {
        statusCode: 401,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "You need to provide a valid uid and journalId"
        })
      });
    }

    // Extract JWT from header
    const JWT = event.headers.authorization;
    // Verify JWT, if user deleted, or JWT is invalid, this will throw an error
    const user: admin.auth.DecodedIdToken = await admin
      .auth()
      .verifyIdToken(JWT, true);

    // Get all tags based on uid & journalId
    const tagsRef = admin.firestore().collection("tags");
    const snapshot = await tagsRef
      .where("uid", "==", user.uid)
      .where("journalId", "==", queryParam.journalId)
      .get();

    // If empty result return an empty array
    if (snapshot.empty) {
      callback(null, {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([])
      });
    }

    // If there is data, enumerate over snapshot
    const data: JTag[] = [];
    snapshot.forEach((doc: FirebaseFirestore.DocumentSnapshot) => {
      const post = doc.data() as JTag;
      data.push({ ...post });
    });

    // sucess response for client when successfully written to db
    return callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error("There was an error", error);
    return callback(null, {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error })
    });
  }
}
