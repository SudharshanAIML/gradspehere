import { useEffect, useState } from "react";
import Chat from "./Chat";
import { useParams } from "react-router";
import axios from "axios";

export default function Chatbot() {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { uid } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/profile/${uid}`)
      .then((response) => {
        // console.log(uid);
        // console.log(response.data);
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [uid]);

  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      {/* Chatbot Icon */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          cursor: "pointer",
          zIndex: 1000,
        }}
        onClick={toggleChat}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/4711/4711987.png" // Replace with your chatbot icon
          alt="Chatbot Icon"
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* Chatbot Container */}
      {isChatVisible && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            zIndex: 999,
          }}
        >
          <Chat studentData={userData} onClose={toggleChat} />
        </div>
      )}
    </div>
  );
}
