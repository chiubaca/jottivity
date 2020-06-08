import axios from "axios";
import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";
import { UserRegistration } from "../../ts/types";

exports.handler = (
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
  const data: UserRegistration = JSON.parse(event.body);
  axios
    .post(
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${process.env.FIREBASE_KEY}`,
      {
        email: data.email,
        password: data.password,
        returnSecureToken: true
      }
    )
    .then((resp) => {
      callback(null, {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: resp.data.idToken
        })
      });
    })
    .catch((err) => {
      console.error("Registration error", err)
      callback(null, {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: err.message
        })
      });
    });
};
