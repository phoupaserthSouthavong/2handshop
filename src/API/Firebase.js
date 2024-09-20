// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDC0yLBl3UoSle40UxADTSUEDuBnAOdEmk",
  authDomain: "two-handshop.firebaseapp.com",
  databaseURL: "https://two-handshop-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "two-handshop",
  storageBucket: "two-handshop.appspot.com",
  messagingSenderId: "1070237597195",
  appId: "1:1070237597195:web:958dcd76ff086a881f910e",
  measurementId: "G-H54TN8KMER"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Pass the app instance to getAuth
export { auth };