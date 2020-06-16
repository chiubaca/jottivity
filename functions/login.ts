import * as firebase from "firebase/app";
import "firebase/auth";
import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";
import { LoginCrendentials } from "../ts/types";
import { firebaseConfig } from "./firebaseConfig";
// Prevents firebase from initilising more than once
// TODO: find a way to remove this.
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
  const loginCreds: LoginCrendentials = JSON.parse(event.body as string);
  try {
    await firebase
      .auth()
      .signInWithEmailAndPassword(loginCreds.email, loginCreds.password);

    // TODO deconstruct User  and user object extract the useful parts from both
    // - stsTokenManager
    // - user credentials
    const User: firebase.User = firebase.auth().currentUser as firebase.User;
    // TODO create type for user object
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
