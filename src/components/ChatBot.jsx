import React, { useState } from "react";
import axios from "axios";
import "../assets/css/chatbot.css"; // Add your styles here

function Chatbot() {
  const [messages, setMessages] = useState([]); // To store the messages in the chat
  const [input, setInput] = useState(""); // To manage the user's input

  // Function to send the message to the backend
  const handleSendMessage = async () => {
    if (input.trim() === "") return; // Don't send empty messages

    // Add the user's message to the chat
    const userMessage = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      // Make an API call to your backend (ensure it's running on localhost:5000)
      const response = await axios.post("http://localhost:5000/api/chat", {
        prompt: input,
      });

      // Check if response.data is an object or string
      let botResponse = "";
      if (typeof response.data === "object") {
        // If response is an object, you can stringify or access a specific property
        botResponse = JSON.stringify(response.data);
      } else {
        // If it's already a string, you can use it directly
        botResponse = response.data;
      }

      // Add the chatbot's response to the chat
      const botMessage = { text: botResponse, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      const botMessage = { text: "Sorry, I couldn't understand that.", sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }

    // Clear the input after sending
    setInput("");
  };

  return (
    <div className="chatbot-container">
      <div className="chatbox">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === "user" ? "user" : "bot"}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Ask a question about internships..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
