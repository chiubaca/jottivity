import * as firebase from "firebase/app";
import "firebase/auth";
import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";
import { JUser, JUserRegistration, firebaseExt } from "../types";
import { firebaseConfig } from "./firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const handler = async function(
  event: APIGatewayProxyEvent,
  _context: any,
  callback: APIGatewayProxyCallback
) {
  if (event.httpMethod !== "POST") {
    console.warn("Invalid HTTP Method used", event.httpMethod);
    callback(null, {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "POST requests only"
      })
    });
  }
  const userData: JUserRegistration = JSON.parse(event.body as string);

  if (userData.email === "" || userData.password === "") {
    return callback(null, {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: {
          message: "email or password can not be empty"
        }
      })
    });
  }

  try {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(userData.email, userData.password);

    const User: firebase.User = firebase.auth().currentUser as firebase.User;

    const userJson: firebaseExt.UserJSON = User.toJSON() as firebaseExt.UserJSON;

    const user: JUser = {
      tokens: {
        refreshToken: userJson.stsTokenManager.refreshToken,
        accessToken: userJson.stsTokenManager.accessToken,
        expirationTime: userJson.stsTokenManager.expirationTime
      },
      email: userJson.email,
      emailVerified: userJson.emailVerified,
      lastLoginAt: userJson.lastLoginAt,
      createdAt: userJson.createdAt
    };

    callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user })
    });
  } catch (error) {
    callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error })
    });
  }
};
