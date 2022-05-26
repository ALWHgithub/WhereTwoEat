
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApsly4CELQsqALU2OI31RpxSjH9do6VtQ",
  authDomain: "wheretwoeat-d3671.firebaseapp.com",
  projectId: "wheretwoeat-d3671",
  storageBucket: "wheretwoeat-d3671.appspot.com",
  messagingSenderId: "508666048568",
  appId: "1:508666048568:web:76ed129e947d52992a36cd"
};


const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
