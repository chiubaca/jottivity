import * as firebase from "firebase/app";
import * as admin from "firebase-admin";
import "firebase/auth";
import "firebase/firestore";
import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";
import { JUser, JUserRegistration, firebaseExt } from "../../types";
import { firebaseConfig } from "../../firebase";
import { initFirebaseAdmin } from "../helpers/initFirebase";

initFirebaseAdmin();

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
  // Check provided credetials are not empty string
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
    // Create the user account on firebase
    await firebase
      .auth()
      .createUserWithEmailAndPassword(userData.email, userData.password);

    // Once user creation is complete, get the user current user.
    const User: firebase.User = firebase.auth().currentUser as firebase.User;

    // Then get the JSON for this user
    const userJson: firebaseExt.UserJSON = User.toJSON() as firebaseExt.UserJSON;

    // Prepare the user object to be sent to the client.
    const user: JUser = {
      tokens: {
        refreshToken: userJson.stsTokenManager.refreshToken,
        accessToken: userJson.stsTokenManager.accessToken,
        expirationTime: userJson.stsTokenManager.expirationTime
      },
      email: userJson.email,
      emailVerified: userJson.emailVerified,
      lastLoginAt: userJson.lastLoginAt,
      createdAt: userJson.createdAt,
      uid: userJson.uid,
      username: userData.name
    };

    // Update the user info store by Firebase auth
    User.updateProfile({
      displayName: userData.name
    });
    // Create a user document with the same id as the uid of the created user
    await admin
      .firestore()
      .collection("users")
      .doc(user.uid)
      .set(user);

    // TODO send verification email to user
    // call another serverless function for this..
    // see- https://firebase.google.com/docs/reference/admin/node/admin.auth.Auth#generateemailverificationlink

    // Send success response to client with the user object
    callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...user })
    });
  } catch (error) {
    // Catch anything that I haven't thought of yet here
    callback(null, {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error })
    });
  }
};
