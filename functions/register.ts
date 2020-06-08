import axios from "axios";
import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";
import { UserRegistration, SignupResponse } from "../ts/types";

exports.handler = async (
  event: APIGatewayProxyEvent,
  _context: any,
  callback: APIGatewayProxyCallback
) => {
  if (event.httpMethod !== "POST") {
    console.warn("Invalid HTTP Method used", event.httpMethod);
    callback(null, {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        error: "POST requests only"
      })
    });
  }
  const userData: UserRegistration = JSON.parse(event.body as string);
  let resp: SignupResponse;
  try {
    resp = await axios.post(
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${process.env.FIREBASE_KEY}`,
      {
        email: userData.email,
        password: userData.password,
        returnSecureToken: true
      }
    );
    callback(null, {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: resp.data.idToken
      })
    });
  } catch (err) {
    console.warn("Registration error", err.message);
    callback(null, {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: err.message
      })
    });
  }
};
