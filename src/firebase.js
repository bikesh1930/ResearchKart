// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // ✅ Firestore import

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2tSd7wd5JYhv-QJKIlFrEgrJq1vWeD0M",
  authDomain: "researchkart-b9c02.firebaseapp.com",
  projectId: "researchkart-b9c02",
  storageBucket: "researchkart-b9c02.appspot.com", // ✅ fix: should be .appspot.com
  messagingSenderId: "361071706826",
  appId: "1:361071706826:web:4db6d89fbfc2b8676c6a33",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firestore
export const db = getFirestore(app);
