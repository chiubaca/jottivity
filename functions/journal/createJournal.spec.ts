import LambdaTester from "lambda-tester";
// import * as admin from "firebase-admin";
// import { initFirebaseAdmin } from "../helpers/initFirebase";
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

  // test("JWT is being verified", async () => {
  //     initFirebaseAdmin();

  //   await LambdaTester(createJournal)
  //     .event({ headers: { authorization: "12345" } })
  //     .expectResult((result: any) => {
  //       return expect(result).toEqual({
  //         body: '{"error":"Unauthorised, no token was provided"}',
  //         headers: {
  //           "Content-Type": "application/json"
  //         },
  //         statusCode: 401
  //       });
  //     });
  // });
});
