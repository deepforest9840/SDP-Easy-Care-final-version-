import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";

const Message = () => {
  const location = useLocation();
  const appointment = location.state?.appointment;

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socketRef = useRef(null);

  // Validate appointment information
  if (!appointment) {
    return <p className="text-center text-red-500">Invalid appointment information.</p>;
  }

  // Connect to WebSocket when component mounts
  useEffect(() => {
    const ws = new WebSocket(
      `ws://localhost:9191/ws/chat?patientEmail=${appointment.patientEmail}&doctorEmail=${appointment.doctorEmail}`
    );

    ws.onopen = () => {
      console.log("WebSocket connection established");
      console.log("patient Email", appointment.patientEmail);
      console.log("doctor Email", appointment.doctorEmail);
    };

    ws.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    };

    ws.onclose = (event) => {
      console.warn("WebSocket closed:", event.reason);
      // Optionally attempt to reconnect after a delay
    };

    ws.onerror = (error) => {
      console.error("WebSocket encountered an error:", error);
    };

    socketRef.current = ws;

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [appointment]);

  const sendMessage = () => {
    if (socketRef.current) {
      const messageObject = {
        sender: appointment.patientEmail,
        receiver: appointment.doctorEmail,
        content: message,
      };
      socketRef.current.send(JSON.stringify(messageObject));
      setMessage('');
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-50 via-white to-green-100 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 flex justify-between items-center shadow-md">
        <div>
          <h1 className="text-xl font-bold">Messaging</h1>
          <p className="text-sm">Chat with Dr. {appointment.doctorName}</p>
        </div>
        <Link to="/user-profile">
          <button className="bg-gray-100 text-green-600 py-2 px-4 rounded hover:bg-gray-200">
            Back
          </button>
        </Link>
      </div>

      {/* Chat Messages */}
      <div className="flex-grow p-6 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start ${
                msg.sender === appointment.patientEmail ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`${
                  msg.sender === appointment.patientEmail
                    ? "bg-gray-200 text-gray-900"
                    : "bg-green-500 text-white"
                } rounded-lg p-4 shadow-md max-w-xs`}
              >
                <p><strong>{msg.sender === appointment.patientEmail ? "You" : "Doctor"}:</strong> {msg.content}</p>
                <span className="text-xs text-gray-500">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="bg-white p-4 border-t shadow-md">
        <div className="flex items-center space-x-2">
          <textarea
            className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="1"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;