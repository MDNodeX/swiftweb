import { initializeApp } from "firebase/app";
// import { auth, provider } from "@/firebase";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getEnv } from "./getEnv";

// Firebase configuration
const firebaseConfig = {
  apiKey: getEnv("VITE_FIREBASE_API_KEY"),
  authDomain: "swiftwebs-7cafc.firebaseapp.com",
  projectId: "swiftwebs-7cafc",
  storageBucket: "swiftwebs-7cafc.firebasestorage.app",
  messagingSenderId: "295931062518",
  appId: "1:295931062518:web:693e08936046f93a24a4d7",
  measurementId: "G-QH7SHTGB0R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Authentication
const auth = getAuth(app);

// ✅ Google Provider
const provider = new GoogleAuthProvider();

export { auth, provider };
