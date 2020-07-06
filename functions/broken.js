const admin = require("firebase-admin")

const SERVICE_ACCOUNT = JSON.parse(process.env.FIREBASE_CONFIG);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(SERVICE_ACCOUNT)
  });
}

exports.handler = async function (event, context, callback) {

  try {
    // Extract JWT from header
    const JWT = event.headers.authorization;

    // Verify JWT, if user deleted, or JWT is invalid, this will throw an error
    const user = await admin.auth().verifyIdToken(JWT, true);

    callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });
  } catch (error) {
    console.error("There was an error", error);
    callback(null, {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error })
    });
  }
};
