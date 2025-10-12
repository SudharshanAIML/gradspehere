import React, { useState, useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
const ProfileTeacher = ({ uid,currentSection }) => {
  const userCtx = useContext(UserContext);
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    linkedin: "",
    profileImage: "",
    jobDetails: [],
    department: "",   
    year: "",
    semester: "",
    rollNo: "",
    section: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (!uid) return;
    axios
      .get(`http://localhost:5000/api/profile/${uid}`)
      .then((response) => {
        if (response.data.message === "Profile not found") {
          navigate("/editprofile"); // Redirect if profile not found
        } else {
          setUser(response.data); // Set profile data in state
          console.log(response.data)
          // console.log(response.data.profileImage);
          userCtx.setUser((prevUser) => ({ ...prevUser, ...response.data }));
        }
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, [uid, navigate]);
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto min-h-screen bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex min-h-screen">
          {/* Left Section - Profile Image, Work Experience, Skills */}
          <div className="  bg-gray-400 md:w-1/3 p-6 border-r border-gray-200">
            <div className="text-center">
              <img
                className="w-32 h-32 rounded-full mx-auto mb-4"
                src={
                  user.profileImage
                    ? `http://localhost:5000${user.profileImage}`
                    : "/assets/profile.jpg"
                }
                alt="Profile"
              />
              <h1 className="text-2xl font-bold text-gray-800">
                {user.name || "Your Name"}
              </h1>
              
            </div>

            {/* Work Experience */}
            <div className="mt-14">
              <h4 className="text-xl font-semibold text-gray-800">
                Work Experience
              </h4>
              {user.jobDetails.length > 0 ? (
                user.jobDetails.map((job, index) => (
                  <div key={index} className="mt-4">
                    <h6 className="text-lg font-medium text-gray-700">
                      {job.company} - {job.role}
                    </h6>
                    <p className="text-gray-600">{job.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No job details available</p>
              )}
              
            </div>
          </div>
          {/* Right Section - User Details */}
          <div className="md:w-2/3 p-6">
            {/* Edit Profile Button */}
            <button
              className="flex items-center justify-end space-x-2 text-blue-600 hover:text-blue-800"
              onClick={() => currentSection(() => "edit-profile")}
            >
              <h6 className="text-lg">Edit Profile</h6>
              <i className="bx bx-edit-alt text-xl"></i>
            </button>

            {/* Department Information */}
            <div className="mt-8">
              <h4 className="text-xl font-semibold text-gray-800 mb-10">
                Department Information
              </h4>
              <div className="grid grid-cols-2 gap-9 mt-4">
                <div>
                  <h6 className="text-gray-600 font-bold">Department</h6>
                  <p className="text-gray-800">
                    {user.department || "Not provided"}
                  </p>
                </div>
                <div>
                  <h6 className="text-gray-600 font-bold">Year</h6>
                  <p className="text-gray-800">{user.year || "Not provided"}</p>
                </div>
                <div>
                  <h6 className="text-gray-600 font-bold">Section</h6>
                  <p className="text-gray-800">
                    {user.section || "Not provided"}
                  </p>
                </div>
                <div>
                  <h6 className="text-gray-600 font-bold">Position</h6>
                  <p className="text-gray-800">
                    {user.section || "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-8">
              <h4 className="text-xl font-semibold text-gray-800 mb-10">
                Contact Information
              </h4>
              <div className="grid grid-cols-2 gap-9 mt-4">
                <div>
                  <h6 className="text-gray-600 font-bold">Phone</h6>
                  <p className="text-gray-800">
                    {user.mobile || "Not provided"}
                  </p>
                </div>
                <div>
                  <h6 className="text-gray-600 font-bold">Email</h6>
                  <p className="text-gray-800">
                    {user.email || "Not provided"}
                  </p>
                </div>
                
                <div>
                  <h6 className="text-gray-600 font-bold">LinkedIn</h6>
                  <a
                    href={user.linkedin || "#"}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {user.linkedin || "Not provided"}
                  </a>
                </div>
              </div>
            </div>            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTeacher;
