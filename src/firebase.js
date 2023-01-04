// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC16JU3qLcYAZ0kKoNU0E47zqUy3PLNJoM",
  authDomain: "chat-fba1e.firebaseapp.com",
  projectId: "chat-fba1e",
  storageBucket: "chat-fba1e.appspot.com",
  messagingSenderId: "211685474148",
  appId: "1:211685474148:web:8688f736c46acd52fd8471",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
