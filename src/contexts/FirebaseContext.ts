import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { createContext } from "react";
import { firebaseConfig } from "../../firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export const firebase = {
  db,
  analytics,
};

const FirebaseContext = createContext(firebase);

export default FirebaseContext;
