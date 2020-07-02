// const {describe, test, expect} = require("jest");
/** 
import * as firebase from "@firebase/testing";

const MY_PROJECT_ID = "jottivity-live";
const myId = "user_abc";
const theirId = "user_xyz";
const myAuth = { uid: "user_abc" };

function getFirestore(auth) {
  return firebase
    .initializeTestApp({ projectId: MY_PROJECT_ID, auth })
    .firestore();
}

function getAdminFirestore() {
  return firebase.initializeAdminApp({ projectId: MY_PROJECT_ID }).firestore();
}

describe("firebase db rules", () => {
  test("understand adds", () => {
    expect(2 + 2).toBe(4);
  });

  test("read items from users collection", async () => {
    const db = getFirestore(null);
    const testDoc = db.collection("readonly").doc("testDoc");
    await firebase.assertSucceeds(testDoc.get());
  });

  test("cant write to the readonly docs", async () => {
    const db = getFirestore(null);
    const testDoc = db.collection("readonly").doc("testDoc2");
    await firebase.assertFails(testDoc.set({ test: "data" }));
  });

  test("can write to a user document with thsae ID as our user", async () => {
    const db = getFirestore(myAuth);
    const testDoc = db.collection("users").doc(myId);
    await firebase.assertSucceeds(testDoc.set({ test: "dummy_data" }));
  });

  // test("can'nt write to a user document with a different ID as our user", async () => {

  //   const db = getFirestore(myAuth)
  //   const testDoc = db.collection("users").doc(theirId)
  //   await firebase.assertFails(testDoc.set({ test: "dummy_data" }));
  // })

  // // These work with db emulator without any data becasue fb rules contain enough hints for these
  // // rules to be evaluated correctly

  test("can read post which are marked as public", async () => {
    // to make it work we have to populate the db with dummy data use the Admin store
    const admin = getAdminFirestore();
    const postId = "public_post";
    const setupDoc = admin.collection("posts").doc(postId);
    await setupDoc.set({ authorId: theirId, visibility: "public" });

    const db = getFirestore(null);
    const testQuery = db
      .collection("posts")
      .where("visibility", "==", "public");
    await firebase.assertSucceeds(testQuery.get());
  });

  // it("can read personal post", async () => {
  //   const db = getFirestore(myAuth)
  //   const testQuery = db.collection("posts").where("authorId", "==", myId)
  //   await firebase.assertSucceeds(testQuery.get())
  // })

  // // this type of test will fail becasue, the search is too broad and my contain results
  // // which the rules cant validate
  // it("query all posts", async () => {
  //   const db = getFirestore(myAuth)
  //   const testQuery = db.collection("posts")
  //   await firebase.assertSucceeds(testQuery.get())
  // })

  // // this example will also fail becasue, it makes too many assumptions which the rules cant validate without
  // // real data, in thory it could successfully return a doc if the doc existed and was marked as public
  // it("can query one doc", async () => {
  //   const db = getFirestore(myAuth)
  //   const testQuery = db.collection("posts").doc("public_post")
  //   await firebase.assertSucceeds(testQuery.get())
  // })
});

// cleanup mock data after test
// after(async()=>{
//   await firebase.clearFirestoreData({projectId: MY_PROJECT_ID})
// })

*/