import * as admin from "firebase-admin";
import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";

export default async function createJournal(
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


    // extract post id from query string
    const queryParam = event?.queryStringParameters;

    if (!queryParam?.id) {
      return callback(null, {
        statusCode: 401,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "no post id was provided" })
      });
    }
    const postId = queryParam.id;
    await admin
      .firestore()
      .collection("posts")
      .doc(postId)
      .delete();

    return callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `deleted post ID ${postId}`
      })
    });
  } catch (error) {
    console.error("There was an error creating a new journal", error);
    return callback(null, {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error })
    });
  } finally {
    // End the firebase instance otherwise netlify function will hang
    await admin.app().delete();
  }
}
