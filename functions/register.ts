import * as firebase from "firebase/app";
import "firebase/auth";

import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";
import { UserRegistration } from "../ts/types";

const firebaseConfig = {
  apiKey: "AIzaSyC6kyIY2DYNrZufwZtB4nBdtbVmuD_uCvg",
  authDomain: "jottivity-prod.firebaseapp.com",
  databaseURL: "https://jottivity-prod.firebaseio.com",
  projectId: "jottivity-prod",
  storageBucket: "jottivity-prod.appspot.com",
  messagingSenderId: "1058066622542",
  appId: "1:1058066622542:web:3e20bcd826d3d130b63b1f"
};

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
  const userData: UserRegistration = JSON.parse(event.body as string);
  try {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(userData.email, userData.password);

    // TODO deconstruct User  and user object extract the useful parts from both
    // - stsTokenManager
    // - user credentials
    const User: firebase.User = await firebase.auth().currentUser;
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
