import * as firebase from "firebase/app";
import "firebase/auth";

import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";
import { JUserRegistration } from "../types";
import { firebaseConfig } from "./firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

exports.handler = async (
  event: APIGatewayProxyEvent,
  _context: any,
  callback: APIGatewayProxyCallback
) => {
  if (event.httpMethod !== "POST") {
    console.warn("Invalid HTTP Method used", event.httpMethod);
    callback(null, {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "POST requests only"
      })
    });
  }
  const userData: JUserRegistration = JSON.parse(event.body as string);
  try {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(userData.email, userData.password);

    // TODO deconstruct User  and user object extract the useful parts from both
    // - stsTokenManager
    // - user credentials
    const User: firebase.User = (await firebase.auth()
      .currentUser) as firebase.User;
    const user: any = User.toJSON();

    console.warn("USER-->", user.stsTokenManager);

    callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: user.stsTokenManager
      })
    });
  } catch (err) {
    const errorCode = err.code;
    const errorMessage = err.message;

    callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        errorCode,
        errorMessage
      })
    });
  }
};
