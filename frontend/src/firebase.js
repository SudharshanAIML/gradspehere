import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCeChLtXeoyycayN-i6GRzvc7fT1Ij26eY",
    authDomain: "gradsphere-acd96.firebaseapp.com",
    projectId: "gradsphere-acd96",
    storageBucket: "gradsphere-acd96.firebasestorage.app",
    messagingSenderId: "61490124972",
    appId: "1:61490124972:web:687b6c84d1ad2aae6a6709",
    // measurementId: "G-465FQFHK03"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, doc, setDoc, getDoc };
