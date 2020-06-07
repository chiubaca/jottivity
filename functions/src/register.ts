import { APIGatewayProxyEvent, APIGatewayProxyCallback } from "aws-lambda";
import axios from "axios";

interface userRegistration {
  email: string;
  name: string;
  password: string;
}

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
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        error: "POST requests only"
      })
    });
  }
  const data: userRegistration = JSON.parse(event.body);
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
      console.log("Success");
      callback(null, {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: "success",
          data: resp
        })
      });
    })
    .catch((err) => {
      // console.error("shit", err);
      callback(null, {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: err
        })
      });
    });
};
