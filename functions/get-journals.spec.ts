import LambdaTester from "lambda-tester";
import { APIGatewayProxyEvent } from "aws-lambda";
import { handler } from "./get-journals";

describe("Get Journals", () => {
  test("endpoint will throw 401 if JWT is not provided", async () => {
    await LambdaTester(handler)
      .event({
        httpMethod: "GET",
        headers: {}
      } as APIGatewayProxyEvent)
      .expectResult((result: any) => {
        return expect(result).toEqual({
          body: '{"error":"Unauthorised, no token was provided"}',
          headers: {
            "Content-Type": "application/json"
          },
          statusCode: 401
        });
      });
  });
});
