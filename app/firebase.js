// firebase.js
import { initializeApp } from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJs6eTE8zid43PHQefBIBVgxhomGRsHgM",
  authDomain: "my-first-project-e5e84.firebaseapp.com",
  projectId: "my-first-project-e5e84",
  storageBucket: "my-first-project-e5e84.appspot.com",
  messagingSenderId: "1088517388534",
  appId: "1:1088517388534:web:77a6ffa34a35617d64d4d7",
  measurementId: "G-RFVZRDMGET",
};

export const auth = initializeApp(firebaseConfig);

export const initFirebase = () => {
  return auth;
};
