import LambdaTester from "lambda-tester";
import createJournal from "./createJournal";

describe("create journals endpoint", () => {
  test("Error if no authorisation header found", async () => {
    await LambdaTester(createJournal)
      .event({ headers: { authorization: undefined } })
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
