import LambdaTester from "lambda-tester";
import { APIGatewayProxyEvent } from "aws-lambda";
import { handler } from "./email-login";

describe("Login", () => {
  test("A placeholder test", () => {
    expect(handler).toBeTruthy();
  });

  test("Access via GET is not allowed", async () => {
    await LambdaTester(handler)
      .event({ httpMethod: "GET" } as APIGatewayProxyEvent)
      .expectResult((result: any) => {
        return expect(result).toEqual({
          body: '{"error":"POST requests only"}',
          headers: {
            "Content-Type": "application/json"
          },
          statusCode: 400
        });
      });
  });

  // test("Test GET is not allowed v2", async () => {
  //   const response = await handler(
  //     {
  //       httpMethod: "GET",
  //       body: '{ "name":"John", "age":30}'
  //     } as APIGatewayProxyEvent,
  //     null,
  //     (_err, resp) => resp
  //   );
  //   expect(response).toBeTruthy();
  // });
});
