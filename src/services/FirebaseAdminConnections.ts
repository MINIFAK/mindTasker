import admin from "firebase-admin";

const decoded = Buffer.from(
  process.env.FIREBASE_CREDENTIALS || "",
  "base64"
).toString("utf-8");

const serviceAccount = JSON.parse(decoded);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();
