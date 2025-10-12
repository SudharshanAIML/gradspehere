/* eslint-disable react/prop-types */
import { useState } from "react";
import { askGemini } from "./gemini";
import styles from "./Chat.module.css"; // Import the CSS module

function Chat({ studentData, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setInput("");

    try {
      const reply = await askGemini(input, studentData); // Pass studentData to askGemini
      const formattedReply = formatResponse(reply); // Format the response before setting it

      setMessages((prev) => [
        ...prev,
        { text: formattedReply, sender: "bot", isHTML: true },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { text: "Error: Could not process request", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["chat-container"]}>
      <div className={styles["chat-header"]}>
        GradSphere Chatbot
        <button className={styles["close-button"]} onClick={onClose}>
          ×
        </button>
      </div>
      <div className={styles["chat-box"]}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles["message"]} ${
              msg.sender === "user"
                ? styles["user-message"]
                : styles["bot-message"]
            }`}
          >
            {msg.isHTML ? (
              <span dangerouslySetInnerHTML={{ __html: msg.text }} />
            ) : (
              msg.text
            )}
          </div>
        ))}
        {loading && (
          <div
            className={`${styles["message"]} ${styles["bot-message"]} ${styles["loading-dots"]}`}
          >
            Thinking
          </div>
        )}
      </div>
      <div className={styles["input-container"]}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAsk()} // 🚀 Enter key triggers send
          placeholder="Type your message..."
          disabled={loading}
        />
        <button onClick={handleAsk} disabled={loading || !input.trim()}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

function formatResponse(text) {
  if (!text) return "No response received.";

  // Convert line breaks into <br> for better readability
  text = text.replace(/\n/g, "<br>");

  // Convert Markdown-style bold (**bold**) to HTML <strong>
  text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Convert Markdown-style italics (*italic*) to HTML <em>
  text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Convert simple lists (- Item) into <ul><li>...</li></ul>
  text = text.replace(/- (.*?)(<br>|$)/g, "<li>$1</li>");
  text = text.replace(/(<li>.*<\/li>)/g, "<ul>$1</ul>");

  return text;
}

export default Chat;
