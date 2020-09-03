import * as admin from "firebase-admin";
import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";

export default async function retrieveTags(
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


    // sucess response for client when successfully written to db
    return callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "not implemented yet"})
    });
  } catch (error) {
    console.error("There was an error", error);
    return callback(null, {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error })
    });
  }
}
