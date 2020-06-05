import {
  APIGatewayProxyEvent,
  APIGatewayProxyCallback
  // @ts-ignore
} from "@types/aws-lambda";

exports.handler = (
  event: APIGatewayProxyEvent,
  _context: any,
  callback: APIGatewayProxyCallback
) => {
  let body = {};

  if (event.httpMethod === "GET") {
    body = event;
  } else if (event.httpMethod === "POST") {
    body = JSON.parse(event.body);
  }

  // do something...

  const response = {
    ...body
  };
  console.log("Test");
  callback(null, {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(response)
  });
};
