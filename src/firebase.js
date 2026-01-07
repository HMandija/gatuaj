// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbWXqQ3ssbAEySIyGMDvUMR4ikJWVjPoo",
  authDomain: "gatuaj-project.firebaseapp.com",
  projectId: "gatuaj-project",
  storageBucket: "gatuaj-project.firebasestorage.app",
  messagingSenderId: "816858885200",
  appId: "1:816858885200:web:23d656cfd2309a684df555",
  measurementId: "G-BZ00WTF2HN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Only initialize analytics in the browser to avoid SSR issues
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
