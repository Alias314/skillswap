import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCucjPvle3dhS1Z73Ut2uFoIkrYdJdFSfs",
  authDomain: "skillswap-2c91f.firebaseapp.com",
  projectId: "skillswap-2c91f",
  storageBucket: "skillswap-2c91f.firebasestorage.app",
  messagingSenderId: "823289864411",
  appId: "1:823289864411:web:04e756d9b1b1edf6526cfe",
  measurementId: "G-8L3XFQ7VRH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);