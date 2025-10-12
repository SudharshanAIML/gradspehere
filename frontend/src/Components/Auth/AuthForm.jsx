import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AuthForm.css";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { loginWithFirebase, register, isLogin, setIsLogin } = useAuth();
  const [userType, setUserType] = useState("student");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const ProfileData = {
    name: formData.name || "",
    email: formData.email || "",
    mobile: "",
    portfolio: "",
    linkedin: "",
    github: "",
    profileImage: "",
    jobDetails: [],
    codingProfiles: {
      leetcode: "",
      codechef: "",
      codeforces: "",
    },
    department: "",
    year: null,
    semester: null,
    rollNo: "",
    section: "",
  };

  const [loading, setLoading] = useState(false);

  const handleNameChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      toast.warn("Please fill in all fields!", { position: "top-right" });

      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        // Login with Firebase
        await loginWithFirebase(formData.email, formData.password);
        toast.success("Signed in successfully!", { position: "top-right" });
        // API CALL FOR PROFILE
        try {
          console.log(ProfileData)
          // await axios.post(`http://localhost:5000/api/profile`, ProfileData, {
          //   headers: { "Content-Type": "multipart/form-data" },
          // });

          // navigate("/studentdashboard");
        } catch (error) {
          console.error("Error updating profile:", error);
        }
      } else {
        // Register user with Firebase
        const userData = await register(
          formData.name,
          formData.email,
          formData.password,
          userType // Pass the selected role
        );

        console.log({
          uid: userData.uid, // Firebase UID
          email: userData.email,
          name: formData.name, // Use the name from the form
          role: userType, // Pass the selected role
          password: formData.password, // Include the password for hashing in the backend
        })

        // Register the user in MongoDB
        await axios.post("http://localhost:5000/api/register", {
          uid: userData.uid, // Firebase UID
          email: userData.email,
          name: formData.name, // Use the name from the form
          role: userType, // Pass the selected role
          password: formData.password, // Include the password for hashing in the backend
        });

        // Update user state
        setUser({ ...user, name: userData.name, email: userData.email });

        toast.success("Account created successfully!", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error:", error); // Log the error for debugging
      toast.error(error.message || "Something went wrong!", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen auth-form bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className=" backdrop-blur-lg bg-white/30 border border-white/20 rounded-2xl shadow-lg px-10 py-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome to Gradsphere
          </h2>
          <p className="text-gray-600">
            {isLogin ? "Sign in to continue" : "Create your account"}
          </p>
        </div>

        {!isLogin && (
          <div className="flex gap-6 mb-6">
            <button
              onClick={() => setUserType("teacher")}
              className={`py-3 px-6 rounded-lg border-gray-800 border-2 flex-1 transition-colors ${
                userType === "teacher"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Teacher
            </button>
            <button
              onClick={() => setUserType("student")}
              className={`py-3 px-6 rounded-lg border-gray-800 border-2 flex-1 transition-colors ${
                userType === "student"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Student
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-4 text-gray-900" size={20} />
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleNameChange}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-800 rounded-lg focus:outline-none focus:border-white"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-4 text-gray-900" size={20} />
            <input
              type="text"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleEmailChange}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-800 rounded-lg focus:outline-none focus:border-white"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-4 text-gray-900" size={20} />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-800 rounded-lg focus:outline-none focus:border-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            {loading
              ? "Please wait..."
              : isLogin
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setFormData({ email: "", password: "", name: "" });
            }}
            className="text-gray-800 hover:underline"
          >
            {isLogin ? "Create one" : "Sign in"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthForm;
