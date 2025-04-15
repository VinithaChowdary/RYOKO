import React, { useState, useEffect } from "react";
import "../Styles/ChatPopup.css";

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: "Namaste! How can I assist you?", sender: "bot" }]);
  const [newMessage, setNewMessage] = useState("");
  const [isScrollToTopVisible, setIsScrollToTopVisible] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (newMessage.trim() === "") return;

    // Update messages locally
    const userMessage = { text: newMessage, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");

    // Send to Flask server
    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: newMessage }),
      });

      const data = await response.json();
      if (data.response) {
        setMessages((prev) => [...prev, { text: data.response, sender: "bot" }]);
      } else {
        setMessages((prev) => [...prev, { text: "Error: Could not process your request.", sender: "bot" }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { text: "Error: Server not reachable.", sender: "bot" }]);
    }
  };

  useEffect(() => {
    // Listen for scroll events to track the ScrollToTop button visibility
    const handleScroll = () => {
      setIsScrollToTopVisible(window.pageYOffset > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="chat-popup-wrapper"
      style={{ bottom: isScrollToTopVisible ? "120px" : "40px" }}
    >
      <div className="chat-icon" onClick={toggleChat}>
        💬
      </div>
      {isOpen && (
        <div className="chat-box">
          <div className="chat-header">
            Chat
            <button className="close-button" onClick={toggleChat}>
              ✖
            </button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${msg.sender === "user" ? "right" : "left"}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPopup;
