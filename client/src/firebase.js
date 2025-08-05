import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Add storage

// REPLACE THIS WITH YOUR CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyAlM5_D0ju5Ir34td_sXH2ScZnlQ3a5OBU",
  authDomain: "paradisehotel-80f40.firebaseapp.com",
  projectId: "paradisehotel-80f40",
  storageBucket: "paradisehotel-80f40.firebasestorage.app",
  messagingSenderId: "606647243716",
  appId: "1:606647243716:web:e6e29e8e2271d5c30b0a91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app); // Add Firestore
export const storage = getStorage(app); // Add Storage