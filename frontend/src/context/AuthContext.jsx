import { createContext, useContext, useState, useEffect } from "react";
import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  doc,
  setDoc,
  getDoc,
} from "../firebase";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setIsLogin(true);
    }
  }, []);

  const storeUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsLogin(true);
  };

  const register = async (name, email, password, role) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), { name, email, role });

      const userData = { uid: user.uid, email, name, role };
      storeUser(userData);

      // Return the user data to be used in the AuthForm component
      return userData;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const loginWithFirebase = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      const role = userDoc.exists() ? userDoc.data().role : null;
      const name = userDoc.exists() ? userDoc.data().name : null;

      const userData = { uid: user.uid, email, name, role };
      storeUser(userData);

      // Navigate based on role
      if (role === "student") {
        navigate(`/studentdashboard/${user.uid}`);
      } else if (role === "teacher") {
        navigate(`/teacherdashboard/${user.uid}`);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    setUser(null);
    setIsLogin(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, isLogin, setIsLogin, loginWithFirebase, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
