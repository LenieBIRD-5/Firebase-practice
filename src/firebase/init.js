// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAI3vnzvwKdTsLd2QlSB3POs4C8Ewzr-nM",
  authDomain: "fir-practice-361df.firebaseapp.com",
  projectId: "fir-practice-361df",
  storageBucket: "fir-practice-361df.firebasestorage.app",
  messagingSenderId: "250297388064",
  appId: "1:250297388064:web:02bb27fa327907567e8045"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();