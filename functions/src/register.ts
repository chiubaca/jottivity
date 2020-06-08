import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";
import { UserRegistration } from "../../ts/types"
import axios from "axios";

exports.handler = (
  event: APIGatewayProxyEvent,
  _context: any,
  callback: APIGatewayProxyCallback
) => {
  console.log("HTTP method: ", event.httpMethod);
  if (event.httpMethod !== "POST") {
    callback(null, {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json",
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
