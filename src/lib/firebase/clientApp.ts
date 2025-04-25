import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "@/lib/firebase/config";

const app = process.env.NODE_ENV == 'development' ? initializeApp(firebaseConfig) : initializeApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
