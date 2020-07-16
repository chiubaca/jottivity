import * as firebase from "firebase/app";
import "firebase/auth";
import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";
import { JUser, JLoginCrendentials, firebaseExt } from "../../types";
import { firebaseConfig } from "../../firebase";

// Prevents firebase from initilising more than once
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const handler = async function(
  event: APIGatewayProxyEvent,
  _context: any,
  callback: APIGatewayProxyCallback
) {
  try {
    if (event.httpMethod === "POST") {
      const loginCreds: JLoginCrendentials = JSON.parse(event.body as string);

      // If credentials are empty return 400 error
      if (loginCreds.email === "" || loginCreds.password === "") {
        return callback(null, {
          statusCode: 400,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            error: { message: "email or password can not be empty" }
          })
        });
      }

      // Parse the credential if they are available
      await firebase
        .auth()
        .signInWithEmailAndPassword(loginCreds.email, loginCreds.password);

      const User: firebase.User = firebase.auth().currentUser as firebase.User;
      const userJson: firebaseExt.UserJSON = User.toJSON() as firebaseExt.UserJSON;
      // Setup the user object to be sent to client
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
        username: userJson.displayName
      };
      callback(null, {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...user })
      });
    } else {
      callback(null, {
        statusCode: 405,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Invalid Operation" })
      });
    }
  } catch (error) {
    callback(null, {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error })
    });
  }
};
