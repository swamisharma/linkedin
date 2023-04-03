// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJfY1SO3UKUYYySgV_kJapPdVyQ6922Ns",
  authDomain: "linkedin-clone-swame.firebaseapp.com",
  projectId: "linkedin-clone-swame",
  storageBucket: "linkedin-clone-swame.appspot.com",
  messagingSenderId: "1022760428020",
  appId: "1:1022760428020:web:12df6061d818a0915199a1",
  measurementId: "G-5KNXRVXDS6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);