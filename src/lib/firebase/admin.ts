import "server-only";

import { applicationDefault, initializeApp, getApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";

const app = getApps().length ? getApp() : initializeApp({
    credential: applicationDefault()
});

export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app);
export const adminStorage = getStorage(app);