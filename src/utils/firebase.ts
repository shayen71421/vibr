// Firebase config for vibr app
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3aONGi6hgmMEa6dSjB1TaplmZ70HOPtk",
  authDomain: "vibr-match-ur-vibes.firebaseapp.com",
  projectId: "vibr-match-ur-vibes",
  storageBucket: "vibr-match-ur-vibes.firebasestorage.app",
  messagingSenderId: "699256247969",
  appId: "1:699256247969:web:a657028ea43230711b42e0",
  measurementId: "G-DPSJD3NK4G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : undefined;