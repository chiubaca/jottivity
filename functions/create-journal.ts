import * as admin from "firebase-admin";
import "firebase/firestore";
import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";
import { JJournal, JToken } from "../types";
import { initFirebaseAdmin } from "./helpers/initFirebase";

initFirebaseAdmin();

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
    const journal: JJournal & JToken = await JSON.parse(event.body as string);
    const { name, uid, createdAt } = journal;

    // write new journal to db
    await admin
      .firestore()
      .collection("journals")
      .add({ name, uid, createdAt });

    // sucess response for client
    return callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, uid, createdAt })
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
