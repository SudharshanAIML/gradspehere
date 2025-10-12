import React, { useState, useEffect } from "react";

const Extras = ({ uid }) => {
  const [softSkill, setSoftSkill] = useState("");
  const [volunteerWork, setVolunteerWork] = useState({
    organization: "",
    role: "",
    description: "",
  });
  const [userData, setUserData] = useState(null);

  // Fetch all user data when the component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/profile/${uid}`
        );
        if (response.ok) {
          const data = await response.json();
          setUserData(data); // Store all user data in state
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [uid]);

  // Function to add a soft skill
  const handleAddSoftSkill = async () => {
    if (softSkill.trim() === "") return;

    // Create a new soft skills array by combining existing soft skills with the new one
    const newSoftSkills = [...(userData?.softSkills || []), softSkill];

    try {
      // Create the updated user data object
      const updatedUserData = {
        ...userData, // Include all existing user data
        softSkills: newSoftSkills, // Update softSkills field
      };

      const response = await fetch(`http://localhost:5000/api/profile/${uid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData), // Send the entire updated user data
      });

      if (response.ok) {
        const updatedUserDataFromServer = await response.json();
        setUserData(updatedUserDataFromServer); // Update the user data state
        setSoftSkill(""); // Clear the input field
      } else {
        const errorText = await response.text(); // Log the error response as text
        console.error("Error response:", errorText);
      }
    } catch (error) {
      console.error("Error adding soft skill:", error);
    }
  };

  // Function to delete a soft skill
  const handleDeleteSoftSkill = async (index) => {
    const newSoftSkills = userData.softSkills.filter((_, i) => i !== index);

    try {
      const updatedUserData = {
        ...userData,
        softSkills: newSoftSkills,
      };

      const response = await fetch(`http://localhost:5000/api/profile/${uid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      });

      if (response.ok) {
        const updatedUserDataFromServer = await response.json();
        setUserData(updatedUserDataFromServer); // Update the user data state
      } else {
        const errorText = await response.text();
        console.error("Error response:", errorText);
      }
    } catch (error) {
      console.error("Error deleting soft skill:", error);
    }
  };

  // Function to add a volunteer work
  const handleAddVolunteerWork = async () => {
    if (
      volunteerWork.organization.trim() === "" ||
      volunteerWork.role.trim() === "" ||
      volunteerWork.description.trim() === ""
    ) {
      return;
    }

    // Create a new volunteer works array by combining existing volunteer works with the new one
    const newVolunteerWorks = [
      ...(userData?.volunteerWorks || []),
      volunteerWork,
    ];

    try {
      const updatedUserData = {
        ...userData,
        volunteerWorks: newVolunteerWorks,
      };

      const response = await fetch(`http://localhost:5000/api/profile/${uid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      });

      if (response.ok) {
        const updatedUserDataFromServer = await response.json();
        setUserData(updatedUserDataFromServer); // Update the user data state
        setVolunteerWork({
          organization: "",
          role: "",
          description: "",
        }); // Clear the input fields
      } else {
        const errorText = await response.text();
        console.error("Error response:", errorText);
      }
    } catch (error) {
      console.error("Error adding volunteer work:", error);
    }
  };

  // Function to delete a volunteer work
  const handleDeleteVolunteerWork = async (index) => {
    const newVolunteerWorks = userData.volunteerWorks.filter(
      (_, i) => i !== index
    );

    try {
      const updatedUserData = {
        ...userData,
        volunteerWorks: newVolunteerWorks,
      };

      const response = await fetch(`http://localhost:5000/api/profile/${uid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      });

      if (response.ok) {
        const updatedUserDataFromServer = await response.json();
        setUserData(updatedUserDataFromServer); // Update the user data state
      } else {
        const errorText = await response.text();
        console.error("Error response:", errorText);
      }
    } catch (error) {
      console.error("Error deleting volunteer work:", error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  return (
    <div className="p-6 bg-white">
      {/* Soft Skills Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Soft Skills</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={softSkill}
            onChange={(e) => setSoftSkill(e.target.value)}
            placeholder="Add a soft skill"
            className="p-2 border border-gray-300 rounded-lg flex-grow"
          />
          <button
            onClick={handleAddSoftSkill}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {userData.softSkills?.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-100 p-2 rounded-lg text-sm flex items-center gap-2"
            >
              {skill}
              <button
                onClick={() => handleDeleteSoftSkill(index)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Volunteer Works Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Volunteer Works</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={volunteerWork.organization}
            onChange={(e) =>
              setVolunteerWork({
                ...volunteerWork,
                organization: e.target.value,
              })
            }
            placeholder="Organization"
            className="p-2 border border-gray-300 rounded-lg w-full"
          />
          <input
            type="text"
            value={volunteerWork.role}
            onChange={(e) =>
              setVolunteerWork({
                ...volunteerWork,
                role: e.target.value,
              })
            }
            placeholder="Role"
            className="p-2 border border-gray-300 rounded-lg w-full"
          />
          <textarea
            value={volunteerWork.description}
            onChange={(e) =>
              setVolunteerWork({
                ...volunteerWork,
                description: e.target.value,
              })
            }
            placeholder="Description"
            className="p-2 border border-gray-300 rounded-lg w-full"
          />
          <button
            onClick={handleAddVolunteerWork}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Add Volunteer Work
          </button>
        </div>
        <div className="mt-6 space-y-4">
          {userData.volunteerWorks?.map((work, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg relative">
              <h3 className="font-bold">{work.organization}</h3>
              <p className="text-sm text-gray-600">{work.role}</p>
              <p className="text-sm text-gray-600">{work.description}</p>
              <button
                onClick={() => handleDeleteVolunteerWork(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Extras;
