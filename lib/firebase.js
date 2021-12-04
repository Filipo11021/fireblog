import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
  limit,
  doc,
  getDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

!getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
export const googleProvider = new GoogleAuthProvider();

/*
 * gets a users/{uid} document with username
 * @param {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("username", "==", username), limit(1));
  const userDoc = await getDocs(q);
  return userDoc.docs[0];
}

/*
 * gets a usernames/{username} document
 * @param {string} username
 */
export async function getUid(username) {
  try {
    const ref = doc(db, "usernames", username);
    const data = await getDoc(ref);
    return data.data();
  } catch (error) {
    console.log(error);
  }
}

/*
 * converts a firestore document to JSON
 * @param {documentSnapshot} doc
 */
export function postToJSON(doc) {
  function toMillis(date) {
    return date * 1000;
  }

  const data = doc?.data();

  if (!data) return;

  return {
    ...data,
    createdAt: toMillis(data.createdAt.seconds) || 0,
    updatedAt: toMillis(data.updatedAt.seconds) || 0,
  };
}
