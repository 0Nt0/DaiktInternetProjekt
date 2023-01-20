import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBDR7zdSeP_d7-Yvr4LmPUfoKjuWVgWzu8",
  authDomain: "hibridiniu-projektas.firebaseapp.com",
  databaseURL: "https://hibridiniu-projektas-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hibridiniu-projektas",
  storageBucket: "hibridiniu-projektas.appspot.com",
  messagingSenderId: "808104601288",
  appId: "1:808104601288:web:a434df323b1736e11467fd",
  measurementId: "G-GCBD3X1Z7F"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
export { db, auth, firebase };