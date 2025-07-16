import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, doc, setDoc, getDoc } from "../firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user from local storage if available
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  // Save user details in localStorage
  const storeUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Register a user and store role in Firestore
  const register = async (name, email, password, role) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data in Firestore
      await setDoc(doc(db, "users", user.uid), { name, email, role });

      const userData = { uid: user.uid, email, role };
      storeUser(userData);
      navigate(role === "teacher" ? "/teacherdashboard" : "/studentdashboard");
    } catch (error) {
      console.error("Registration Error:", error.message);
    }
  };

  // Login using Firebase authentication
  const loginWithFirebase = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const role = userDoc.exists() ? userDoc.data().role : null;

      const userData = { uid: user.uid, email, role };
      storeUser(userData);
      navigate(role === "teacher" ? "/teacherdashboard" : "/studentdashboard");
    } catch (error) {
      console.error("Firebase Login Error:", error.message);
    }
  };

  // Login using API-based authentication
  const loginWithAPI = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", { email, password });
      storeUser(res.data);
      navigate(res.data.role === "teacher" ? "/teacherdashboard" : "/studentdashboard");
    } catch (error) {
      console.error("API Login Error:", error.message);
    }
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loginWithFirebase, loginWithAPI, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
