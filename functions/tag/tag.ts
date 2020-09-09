/**
 * Main entry point for journal endpoint.
 */
import * as admin from "firebase-admin";
import "firebase/firestore";
import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";
import { initFirebaseAdmin } from "../helpers/initFirebase";
import createPost from "./createTag";
import retrievePost from "./retrieveTags";
import updatePost from "./updateTag";
import deletePost from "./deleteTag";

export const handler = async function(
  event: APIGatewayProxyEvent,
  _context: any,
  callback: APIGatewayProxyCallback
) {
  initFirebaseAdmin();
  try {
    if (event.httpMethod === "GET") {
      await retrievePost(event, _context, callback);
      return;
    }
    if (event.httpMethod === "POST") {
      await createPost(event, _context, callback);
      return;
    }
    if (event.httpMethod === "DELETE") {
      await deletePost(event, _context, callback);
      return;
    }
    if (event.httpMethod === "PATCH") {
      await updatePost(event, _context, callback);
      return;
    } else {
      // Very import to call this before callback otherwise Netlify lambda will timeout.
      // https://github.com/firebase/firebase-admin-node/issues/929
      await admin.app().delete();
      callback(null, {
        statusCode: 405,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "not supported" })
      });
    }
  } catch (error) {
    console.error("There was an error", error);
    callback(null, {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error })
    });
  } finally {
    // End the firebase instance otherwise netlify function will hang
    await admin.app().delete();
  }
};
