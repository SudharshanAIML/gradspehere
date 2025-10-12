import React, { useState, useEffect } from "react";
import axios from "axios";

const CertificationAndAchievements = ({ uid }) => {
  const [certificates, setCertificates] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [certificateDescription, setCertificateDescription] = useState("");
  const [certificateFile, setCertificateFile] = useState(null);

  // Fetch user data from the backend on component mount
  useEffect(() => {
    fetchUserData();
  }, [uid]);

  // Fetch user data including certificates and achievements
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/profile/${uid}`
      );
      setCertificates(response.data.certificates || []);
      setAchievements(response.data.achievements || []);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Handle certificate upload
  const handleCertificateUpload = async () => {
    if (!certificateFile || !certificateDescription.trim()) {
      alert("Please select a file and provide a description.");
      return;
    }

    const formData = new FormData();
    formData.append("file", certificateFile);
    formData.append("upload_preset", "gradesphere"); // Replace with your Cloudinary upload preset

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Upload to Cloudinary
      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/diimzu03h/upload",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress);
          },
        }
      );

      const certificateLink = cloudinaryResponse.data.secure_url;

      // Fetch the existing profile data
      const profileResponse = await axios.get(
        `http://localhost:5000/api/profile/${uid}`
      );
      const prevData = profileResponse.data;

      // Update the certificates array
      const updatedCertificates = [
        ...(prevData.certificates || []),
        {
          name: certificateFile.name,
          link: certificateLink,
          description: certificateDescription,
        },
      ];

      // Merge the updated certificates with the previous data
      const updatedData = {
        ...prevData,
        certificates: updatedCertificates,
      };

      // Save the updated data to MongoDB
      const response = await axios.put(
        `http://localhost:5000/api/profile/${uid}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response:", response.data);
      setCertificates(updatedCertificates); // Update local state
      setCertificateDescription(""); // Reset description
      setCertificateFile(null); // Reset file
    } catch (error) {
      console.error("Error uploading certificate:", error);
      console.error("Error details:", error.response?.data);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Handle certificate deletion
  const handleDeleteCertificate = async (index) => {
    try {
      // Fetch the existing profile data
      const profileResponse = await axios.get(
        `http://localhost:5000/api/profile/${uid}`
      );
      const prevData = profileResponse.data;

      // Remove the certificate at the specified index
      const updatedCertificates = prevData.certificates.filter(
        (_, i) => i !== index
      );

      // Merge the updated certificates with the previous data
      const updatedData = {
        ...prevData,
        certificates: updatedCertificates,
      };

      // Save the updated data to MongoDB
      const response = await axios.put(
        `http://localhost:5000/api/profile/${uid}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response:", response.data);
      setCertificates(updatedCertificates); // Update local state
    } catch (error) {
      console.error("Error deleting certificate:", error);
    }
  };

  // Handle adding achievements
  const handleAddAchievement = async () => {
    if (!newAchievement.trim()) {
      alert("Please enter an achievement description.");
      return;
    }

    try {
      // Fetch the existing profile data
      const profileResponse = await axios.get(
        `http://localhost:5000/api/profile/${uid}`
      );
      const prevData = profileResponse.data;

      // Update the achievements array
      const updatedAchievements = [
        ...(prevData.achievements || []),
        { description: newAchievement },
      ];

      // Merge the updated achievements with the previous data
      const updatedData = {
        ...prevData,
        achievements: updatedAchievements,
      };

      // Save the updated data to MongoDB
      const response = await axios.put(
        `http://localhost:5000/api/profile/${uid}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response:", response.data);
      setAchievements(updatedAchievements); // Update local state
      setNewAchievement(""); // Reset input
    } catch (error) {
      console.error("Error adding achievement:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Certifications Section */}
      <h2 className="text-2xl font-bold mb-4">Certifications</h2>
      <div className="mb-6">
        <div className="flex flex-col space-y-4 mb-4">
          <input
            type="file"
            onChange={(e) => setCertificateFile(e.target.files[0])}
            className="p-2 border rounded-lg"
            disabled={isUploading}
          />
          <input
            type="text"
            value={certificateDescription}
            onChange={(e) => setCertificateDescription(e.target.value)}
            className="p-2 border rounded-lg"
            placeholder="Enter certificate description"
          />
          <button
            onClick={handleCertificateUpload}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
            disabled={isUploading}
          >
            {isUploading
              ? `Uploading... ${uploadProgress}%`
              : "Upload Certificate"}
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="flex-1 min-w-[250px] max-w-[300px] p-4 border rounded-lg shadow-sm"
            >
              <h3 className="text-lg font-semibold">{cert.name}</h3>
              <p className="text-gray-600">{cert.description}</p>
              <a
                href={cert.link}
                download
                className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Download
              </a>
              <button
                onClick={() => handleDeleteCertificate(index)}
                className="mt-2 ml-2 inline-block bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Section */}
      <h2 className="text-2xl font-bold mb-4">Achievements</h2>
      <div className="mb-6">
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={newAchievement}
            onChange={(e) => setNewAchievement(e.target.value)}
            className="flex-1 p-2 border rounded-lg"
            placeholder="Add a new achievement"
          />
          <button
            onClick={handleAddAchievement}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-sm">
              <p className="text-gray-700">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificationAndAchievements;
