import admin from "firebase-admin";

import * as serviceAcount from "../config/json/mindtaskerFirebaseAdmin.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAcount as admin.ServiceAccount),
  });
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();
