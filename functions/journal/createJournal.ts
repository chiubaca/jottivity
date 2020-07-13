import * as admin from "firebase-admin";
import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";
import { JJournal, JToken } from "../../types";

export default async function createJournal(
  event: APIGatewayProxyEvent,
  callback: APIGatewayProxyCallback
) {
  const journal: JJournal & JToken = await JSON.parse(event.body as string);
  const { name, uid, createdAt } = journal;

  // write new journal to db
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
}
