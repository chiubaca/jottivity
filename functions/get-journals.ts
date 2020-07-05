import * as admin from "firebase-admin";
import "firebase/firestore";
import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";
import { JJournal } from "../types";
import { initFirebaseAdmin } from "./helpers/initFirebase";

initFirebaseAdmin();

export const handler = async function(
  event: APIGatewayProxyEvent,
  _context: any,
  callback: APIGatewayProxyCallback
) {
  // If no authorisation header is provided reject
  if (!event.headers.authorization) {
    return callback(null, {
      statusCode: 401,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Unauthorised, no token was provided" })
    });
  }

  try {
    // Extract JWT from header
    const JWT = event.headers.authorization;

    // Verify JWT, if user deleted, or JWT is invalid, this will throw an error
    const user: admin.auth.DecodedIdToken = await admin
      .auth()
      .verifyIdToken(JWT, true);

    // TODO Could check for custom claim for additional security logic here
    // see - https://firebase.google.com/docs/auth/admin?hl=en

    // Get journals based on user.uid
    const usersRef = admin.firestore().collection("journals");
    const snapshot = await usersRef.where("uid", "==", user.uid).get();

    if (snapshot.empty) {
      return callback(null, {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([])
      });
    }

    // Enumerate through snapshot and push into data array to be sent to client
    const data: JJournal[] = [];
    snapshot.forEach((doc) => data.push(doc.data() as JJournal));
    return callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data })
    });
  } catch (error) {
    console.error("There was an error", error);
    callback(null, {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error })
    });
  }
};
