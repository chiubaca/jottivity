import * as admin from "firebase-admin";
import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";
import { JTag } from "../../types";
export default async function createTag(
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
    // Extract JWT from header
    const JWT = event.headers.authorization;
    // Verify JWT, if user deleted, or JWT is invalid, this will throw an error
    await admin.auth().verifyIdToken(JWT, true);

    // write new tag to db
    const tag: JTag = await JSON.parse(event.body as string);

    // Create a reference to tag document
    const newTagRef: FirebaseFirestore.DocumentReference = await admin
      .firestore()
      .collection("tags")
      .doc();

    // Spread in contents of the tag object and also append in document refId
    await newTagRef.set({ ...tag, tagId: newTagRef.id });

    // Get the contents of newly created tag document for client response
    const tagData = await newTagRef.get();

    // sucess response for client when successfully written to db
    return callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...tagData.data() })
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
