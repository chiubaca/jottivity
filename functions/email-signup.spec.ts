import LambdaTester from "lambda-tester";
import { APIGatewayProxyEvent } from "aws-lambda";
import { handler } from "./email-signup";

describe("Signup", () => {
  test("Access via GET is not allowed", async () => {
    await LambdaTester(handler)
      .event({ httpMethod: "GET" } as APIGatewayProxyEvent)
      .expectResult((result: any) => {
        return expect(result).toEqual({
          body: '{"error":"POST requests only"}',
          headers: {
            "Content-Type": "application/json"
          },
          statusCode: 405
        });
      });
  });

  test("The provided credentials are not empty", async () => {
    await LambdaTester(handler)
      .event({
        httpMethod: "POST",
        body: '{ "email": "", "password": "" }'
      } as any)
      .expectResult((result: any) => {
        return expect(result).toEqual({
          body: '{"error":{"message":"email or password can not be empty"}}',
          headers: {
            "Content-Type": "application/json"
          },
          statusCode: 400
        });
      });
  });
});
