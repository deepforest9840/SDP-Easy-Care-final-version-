// import React from "react";
// import { useLocation, Link } from "react-router-dom";

// const MessagePage = () => {

//   const location = useLocation();
//   const appointment = location.state?.appointment;

//   if (!appointment) {
//     return <p className="text-center text-red-500">Invalid appointment information.</p>;
//   }

//   return (
//     <div className="bg-gradient-to-r from-green-50 via-white to-green-100 min-h-screen flex flex-col">
//       {/* Header */}
//       <div className="bg-green-600 text-white p-4 flex justify-between items-center shadow-md">
//         <div>
//           <h1 className="text-xl font-bold">Messaging</h1>
//           <p className="text-sm">Chat with Dr. {appointment.doctorName}</p>
//         </div>
//         <Link to="/user-profile">
//           <button className="bg-gray-100 text-green-600 py-2 px-4 rounded hover:bg-gray-200">
//             Back
//           </button>
//         </Link>
//       </div>

//       {/* Chat Messages */}
//       <div className="flex-grow p-6 overflow-y-auto">
//         <div className="space-y-4">
//           {/* Example Incoming Message */}
//           <div className="flex items-start space-x-4">
//             <div className="bg-green-500 text-white rounded-lg p-4 shadow-md max-w-xs">
//               <p>Hi, this is Dr. {appointment.doctorName}. How can I help you today?</p>
//               <span className="text-xs text-green-100">10:45 AM</span>
//             </div>
//           </div>

//           {/* Example Outgoing Message */}
//           <div className="flex items-end justify-end space-x-4">
//             <div className="bg-gray-200 text-gray-900 rounded-lg p-4 shadow-md max-w-xs">
//               <p>Hi Doctor, I had some concerns about my appointment.</p>
//               <span className="text-xs text-gray-500">10:46 AM</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Input Box */}
//       <div className="bg-white p-4 border-t shadow-md">
//         <div className="flex items-center space-x-2">
//           <textarea
//             className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//             rows="1"
//             placeholder="Type your message..."
//           ></textarea>
//           <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessagePage;


import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";

const DoctorMessagePage = () => {
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
      `ws://localhost:9191/ws/chat?patientEmail=${appointment.doctorEmail}&doctorEmail=${appointment.patientEmail}`
    );

    ws.onopen = () => {
      console.log("WebSocket connection established");
      console.log("doctor Email",appointment.doctorEmail);
      console.log("patient Email",appointment.patientEmail);
     
    };

    ws.onmessage = (event) => {
      const incomingMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, incomingMessage]);
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
    if (!message.trim()) return;

    const payload = {
        sender: appointment.patientEmail,
        receiver: appointment.doctorEmail,
        content: message.trim(),
        timestamp: new Date().toISOString(),
    };

    if (socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify(payload));
        setMessages((prev) => [...prev, payload]);
        setMessage("");
    } else {
        alert("Connection lost! Please refresh the page.");
    }
  };


  return (
    <div className="bg-gradient-to-r from-green-50 via-white to-green-100 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 flex justify-between items-center shadow-md">
        <div>
          <h1 className="text-xl font-bold">Messaging</h1>
          <p className="text-sm">Chat with patient :. {appointment.patientName}</p>
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
              msg.sender === appointment.doctorEmail ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`${
                msg.sender === appointment.doctorEmail
                  ? "bg-gray-200 text-gray-900"
                  : "bg-green-500 text-white"
              } rounded-lg p-4 shadow-md max-w-xs`}
            >
              <p><strong>{msg.sender === appointment.doctorEmail ? "You" : "Patient"}:</strong> {msg.content}</p>
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

export default DoctorMessagePage;
