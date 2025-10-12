/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Editprofile = ({ setActiveSection }) => {
  const navigate = useNavigate();
  const { uid } = useParams();
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    portfolio: "",
    linkedin: "",
    github: "",
    profileImage: "",
    jobDetails: [{ company: "", role: "", description: "" }],
    codingProfiles: { leetcode: "", codechef: "", codeforces: "" },
    department: "",
    year: "",
    semester: "",
    rollNo: "",
    section: "",
    techStacks: [], // Added techStacks field
  });
  const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress (0-100)
  const [isUploading, setIsUploading] = useState(false); // Track if upload is in progress
  const [uploadStatus, setUploadStatus] = useState(""); // Track upload status (e.g., "Uploading...")

  useEffect(() => {
    if (!uid) return; // Ensure `uid` is available

    axios
      .get(`http://localhost:5000/api/profile/${uid}`)
      .then((response) => {
        if (response.data) {
          setFormData(response.data); // Initialize form data
        }
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, [uid]); // Add `uid` to the dependency array

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "gradesphere"); // Replace with your actual upload preset

    setIsUploading(true); // Set uploading state to true
    setUploadStatus("Uploading..."); // Update status

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/diimzu03h/image/upload",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress); // Update progress
          },
        }
      );

      if (response.data.secure_url) {
        setUploadStatus("Uploaded!"); // Update status
        setFormData((prev) => ({
          ...prev,
          profileImage: response.data.secure_url,
        }));
        console.log("File uploaded successfully:", response.data.secure_url);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadStatus("Upload failed."); // Update status on error
    } finally {
      setIsUploading(false); // Reset uploading state
    }
  };

  const handleJobChange = (index, e) => {
    const { name, value } = e.target;
    const updatedJobDetails = [...formData.jobDetails];
    updatedJobDetails[index][name] = value;
    setFormData((prev) => ({ ...prev, jobDetails: updatedJobDetails }));
  };

  const addJobField = () => {
    setFormData((prev) => ({
      ...prev,
      jobDetails: [
        ...prev.jobDetails,
        { company: "", role: "", description: "" },
      ],
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setUser(formData);

    const dataToSend = {
      ...formData,
      uid, // Include the uid in the data
    };

    try {
      await axios.put(`http://localhost:5000/api/profile/${uid}`, dataToSend, {
        headers: { "Content-Type": "application/json" }, // Set content type to JSON
      });
      setActiveSection(() => "profile");
      navigate(`/teacherdashboard/${uid}`);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6"
      >
        {/* Basic Info */}
        <h4 className="text-lg font-semibold mb-4">Personal Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div>
        </div>

        {/* Department Info */}
        <h4 className="text-lg font-semibold mt-6 mb-4">
          Department Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-2">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2">Year</label>
            <input
              type="text"
              maxLength={1}
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2">Semester</label>
            <input
              type="text"
              maxLength={1}
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2">Section</label>
            <input
              type="text"
              maxLength={1}
              name="section"
              value={formData.section}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div>
        </div>

        {/* Social Links */}
        <h4 className="text-lg font-semibold mt-6 mb-4">Social Profiles</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-2">LinkedIn</label>
            <input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>
        </div>

        {/* Job Details */}
        <h4 className="text-lg font-semibold mt-6 mb-4">Job Experience</h4>
        {formData.jobDetails.map((job, index) => (
          <div key={index} className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="mb-2">Company</label>
                <input
                  type="text"
                  name="company"
                  value={job.company}
                  onChange={(e) => handleJobChange(index, e)}
                  className="p-2 border rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2">Role</label>
                <input
                  type="text"
                  name="role"
                  value={job.role}
                  onChange={(e) => handleJobChange(index, e)}
                  className="p-2 border rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2">Description</label>
                <input
                  type="text"
                  name="description"
                  value={job.description}
                  onChange={(e) => handleJobChange(index, e)}
                  className="p-2 border rounded"
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          onClick={addJobField}
        >
          + Add Job
        </button>

        {/* Profile Image */}
        <h4 className="text-lg font-semibold mt-6 mb-4">Profile Image</h4>
        <div>
          <input
            type="file"
            onChange={handleFileChange}
            disabled={isUploading}
          />
          {isUploading && (
            <div>
              <progress value={uploadProgress} max="100" />
              <p>
                {uploadStatus} {uploadProgress}%
              </p>
            </div>
          )}
          {!isUploading && uploadStatus && <p>{uploadStatus}</p>}
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded mt-6 w-full"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default Editprofile;
