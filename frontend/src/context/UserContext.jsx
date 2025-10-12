// UserContext.jsx
import React, { createContext, useState } from "react";

// Create the context
export const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    portfolio: "",
    linkedin: "",
    github: "",
    profileImage: "",
    jobDetails: [],
    codingProfiles: { leetcode: "", codechef: "", codeforces: "" },
    department: "",
    year: "",
    semester: "",
    rollNo: "",
    section: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
