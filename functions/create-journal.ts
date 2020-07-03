import * as admin from "firebase-admin";
import "firebase/firestore";
import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";
import { JJournal } from "../types";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CONFIG))
  });
}

const db = admin.firestore();

export const handler = async function(
  event: APIGatewayProxyEvent,
  _context: any,
  callback: APIGatewayProxyCallback
) {
  if (event.httpMethod !== "POST") {
    callback(null, {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "POST requests only"
      })
    });
  }

  try {
    const journal: JJournal = await JSON.parse(event.body as string);

    // write to db
    const resp = await db.collection("journals").add({
      title: journal.name
    });
    console.log(resp)
    return callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "created journal" + journal.name })
    });
  } catch (error) {
    console.error(error);
    callback(null, {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error })
    });
  }
};
