import * as admin from "firebase-admin";
import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";
import { JJournal } from "../../types";

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

  // TODO Could check for custom claim for additional security logic here
  // see - https://firebase.google.com/docs/auth/admin?hl=en

  // TODO: Should also verify that user id param has been passed and should
  // cross check this with the JWT

  // Get journals based on user.uid
  const journalsRef = admin.firestore().collection("journals");
  const snapshot = await journalsRef.where("uid", "==", user.uid).get();

  if (snapshot.empty) {
    callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([])
    });
  }

  // Enumerate through snapshot and push into data array to be sent to client
  const data: JJournal[] = [];
  snapshot.forEach((doc: FirebaseFirestore.DocumentSnapshot) => {
    const journal = doc.data() as JJournal;
    data.push({ ...journal, journalId: doc.id });
  });

  callback(null, {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}
