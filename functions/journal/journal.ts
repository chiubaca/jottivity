import * as admin from "firebase-admin";
import "firebase/firestore";
import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";
import { initFirebaseAdmin } from "../helpers/initFirebase";
import retrieveJournal from "./retrieveJournal";
import createJournal from "./createJournal";
import deleteJournal from "./deleteJournal";
export const handler = async function(
  event: APIGatewayProxyEvent,
  _context: any,
  callback: APIGatewayProxyCallback
) {
  initFirebaseAdmin();
  try {
    if (event.httpMethod === "GET") {
      // handle retreiving journals
      await retrieveJournal(event, callback);
      return;
    }
    if (event.httpMethod === "POST") {
      // handle creating new journals
      await createJournal(event, callback);
      return;
    }
    if (event.httpMethod === "DELETE") {
      // handle creating new journals
      await deleteJournal(event, callback);
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
  }
};
