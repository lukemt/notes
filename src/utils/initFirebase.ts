import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

export const firebaseConfigInvalidVars = Object.keys(firebaseConfig).filter(
  (key) => !(firebaseConfig as any)[key]
);

export function initFirebase() {
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const firestore = getFirestore(app);
  try {
    enableIndexedDbPersistence(firestore).catch((err) => {
      if (err.code === "failed-precondition") {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        console.error("Multiple tabs open, persistence cannot be enabled", err);
      } else if (err.code === "unimplemented") {
        // The current browser does not support all of the
        // features required to enable persistence
        console.log("The current browser does not support persistence", err);
      }
    });
    // Subsequent queries will use persistence, if it was enabled successfully
  } catch (error) {
    console.error("could't enable persistence", error);
  }
  return { firestore, analytics };
}
