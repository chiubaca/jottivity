import * as admin from "firebase-admin";
import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";
import { JPost } from "../../types";

export default async function createJournal(
  event: APIGatewayProxyEvent,
  _context: any,
  callback: APIGatewayProxyCallback
) {
  try {
    // check for authorisation header
    if (!event.headers.authorization) {
      return callback(null, {
        statusCode: 401,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Unauthorised, no token was provided" })
      });
    }

    // extract post id from query string
    const queryParam = event?.queryStringParameters;

    if (!queryParam?.uid || !queryParam?.journalid) {
      return callback(null, {
        statusCode: 401,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "Both uid and journal id params are required"
        })
      });
    }

    // Extract JWT from header
    const JWT = event.headers.authorization;
    // Extract uid from url param
    const uid = queryParam.uid;
    // Extract Journal ID from url param
    const journalId = queryParam.journalid;

    // Verify JWT, if user deleted, or JWT is invalid, this will throw an error
    const user: admin.auth.DecodedIdToken = await admin
      .auth()
      .verifyIdToken(JWT, true);

    // Cross check JWT uid with url uid for extra security
    if (user.uid !== uid) {
      return callback(null, {
        statusCode: 401,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "JWT uid does not match provided uid" })
      });
    }

    // Get all posts based on uid & journalId
    const postsRef = admin.firestore().collection("posts");
    const snapshot = await postsRef
      .where("uid", "==", user.uid)
      .where("journalId", "==", journalId)
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
    const data: JPost[] = [];
    snapshot.forEach((doc: FirebaseFirestore.DocumentSnapshot) => {
      const post = doc.data() as JPost;
      data.push({ ...post, id: doc.id });
    });

    return callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error("There was an error retrieving user posts", error);
    return callback(null, {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error })
    });
  } finally {
    // Close the database connection. Really important for Netlify functions, otherwise API will timeout
    await admin.app().delete();
  }
}
