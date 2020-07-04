// import * as admin from "firebase-admin";
// import "firebase/firestore";
import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";
// import { JJournal, JToken } from "../types";
import { initFirebaseAdmin } from "./helpers/initFirebase";

initFirebaseAdmin();

export const handler = function(
  _event: APIGatewayProxyEvent,
  _context: any,
  callback: APIGatewayProxyCallback
) {
  try {
    return callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Hello from get journals" })
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
