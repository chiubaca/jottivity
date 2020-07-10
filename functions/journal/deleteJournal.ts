import * as admin from "firebase-admin";
import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";
// import { JJournal } from "../../types";

export default async function retrieveJournals(
  event: APIGatewayProxyEvent,
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
  // Extract JWT from header
  const JWT = event.headers.authorization;
  // Verify JWT, if user deleted, or JWT is invalid, this will throw an error
  const user: admin.auth.DecodedIdToken = await admin
    .auth()
    .verifyIdToken(JWT, true);

  // extract journal id from query string
  const queryParam = event?.queryStringParameters;

  if (!queryParam?.id) {
    return callback(null, {
      statusCode: 401,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "no journal id was provided" })
    });
  }

  await admin
    .firestore()
    .collection("journals")
    .doc(queryParam.id)
    .delete();

  await admin.app().delete();
  callback(null, {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: "deleted journal ID" + queryParam.id
    })
  });
}
