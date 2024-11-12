// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Import getAuth for authentication
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";  // Import getStorage for file storage
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCucjPvle3dhS1Z73Ut2uFoIkrYdJdFSfs",
  authDomain: "skillswap-2c91f.firebaseapp.com",
  projectId: "skillswap-2c91f",
  storageBucket: "skillswap-2c91f.appspot.com",  // Corrected storageBucket URL
  messagingSenderId: "823289864411",
  appId: "1:823289864411:web:04e756d9b1b1edf6526cfe",
  measurementId: "G-8L3XFQ7VRH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);  // Export storage for file handling