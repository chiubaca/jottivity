import * as admin from "firebase-admin";

export function initFirebaseAdmin() {
  try {
    const SERVICE_ACCOUNT = JSON.parse(process.env.FIREBASE_CONFIG as any);
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(SERVICE_ACCOUNT)
      });
    }
  } catch (err) {
    console.error(
      "There was a problem parsing the Firebase service account environment variable"
    );
  }
}
