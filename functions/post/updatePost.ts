import * as admin from "firebase-admin";
import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";
import { JPost } from "../../types";

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

    // contents of updated Journal
    const updatedPost: JPost = await JSON.parse(event.body as string);

    // TODO: cross check uid with JWT token for extra security

    // type check post id to please the TS gods
    if (typeof updatedPost.postId !== "string") {
      return callback(null, {
        statusCode: 401,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Post ID not valid" })
      });
    }

    await admin
      .firestore()
      .collection("posts")
      .doc(updatedPost.postId)
      .update(updatedPost);

    return callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: `Updated post ID ${updatedPost.postId}` })
    });
  } catch (error) {
    console.error("There was a problem updating the post");

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
