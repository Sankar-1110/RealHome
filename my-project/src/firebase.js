// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estateweb-363f9.firebaseapp.com",
  projectId: "estateweb-363f9",
  storageBucket: "estateweb-363f9.appspot.com",
  messagingSenderId: "124163985889",
  appId: "1:124163985889:web:a8f676c173671776eb02a0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);