import * as admin from "firebase-admin";
import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";
import { JJournal, JToken } from "../../types";

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

    // write new journal to db
    const journal: JJournal & JToken = await JSON.parse(event.body as string);
    const { name, uid, createdAt } = journal;
    const newJournal = await admin
      .firestore()
      .collection("journals")
      .add({ name, uid, createdAt });

    // sucess response for client
    return callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, uid, createdAt, id: newJournal.id })
    });
  } catch (error) {
    console.error("There was an error creating a new journal", error);
    return callback(null, {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error })
    });
  }
}
