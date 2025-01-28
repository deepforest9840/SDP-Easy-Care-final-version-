import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./UserProfile.css";
import axios from "axios"; // Import Axios for API calls

const UserProfile = () => {
  const navigate = useNavigate();
  const UserEmail = localStorage.getItem("userEmail");
  const [userDetails, setUserDetails] = useState({});
  const [appointmentHistory, setAppointmentHistory] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unseenNotificationNumber , setUnseenNotificationNumber] = useState(0) ; 

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "status-pending";
      case "completed":
        return "status-completed";
      case "cancel appointment":
        return "status-cancelled";
      default:
        return "";
    }
  };

  // Fetch Appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `http://localhost:9191/api/v1/newappointments/getAppointmentsByUserEmail?email=${encodeURIComponent(
            UserEmail
          )}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch appointment data");
        }
        const data = await response.json();
        setAppointmentHistory(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError("Unable to load appointment data. Please try again.");
      }
    };

    if (UserEmail) {
      fetchAppointments();
    }
  }, [UserEmail]);

  // Fetch User Details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:9191/api/v1/user/getUser?email=${encodeURIComponent(
            UserEmail
          )}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const data = await response.json();
        setUserDetails(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Unable to load user details. Please try again.");
      }
    };

    if (UserEmail) {
      fetchUserDetails();
    }
  }, [UserEmail]);

  // Fetch Notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `http://localhost:9191/api/v1/prescriptions/getprescriptionByPatientEmail?patientEmail=${encodeURIComponent(
            UserEmail
          )}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
        const data = await response.json();
        setNotifications(data);
        console.log("prescriptions : ", data) ;

        let unseenCount = 0;
        for (const notification of data) {
          if (notification.seenStatus === "unseen") {
            unseenCount++;
          }
        }
        setUnseenNotificationNumber(unseenCount) ;

        console.log("Number of unseen notifications:", unseenCount);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    if (UserEmail) {
      fetchNotifications();
    }
  }, [UserEmail]);

  // const handleNotificationClick = (prescription) => {

  //   prescription.seenStatus = "seen" ;

  //   // Navigate to the prescription page with prescription data
  //   navigate("/prescriptionpage", { state: { prescription } });
  // };


 

  // 
  const handleNotificationClick = async (prescription) => {
    // Navigate immediately
    navigate("/prescriptionpage", { state: { prescription } });
  
    // Update the seenStatus asynchronously
    if (prescription.seenStatus === "unseen") {
      try {
        const response = await fetch(
          `http://localhost:9191/api/v1/prescriptions/updateSeenStatus?id=${encodeURIComponent(
            prescription.appointmentId
          )}`
        );
        if (!response.ok) {
          throw new Error("Failed to update seen status");
        }
        console.log("updated  seen status") ;
        prescription.seenStatus = "seen";
      } catch (error) {
        console.error("Error updating seenStatus:", error);
        // Optionally, notify the user on the new page or log the error for debugging
      }
    }
  };
  

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 via-white to-blue-50 min-h-screen p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
          <div className="bg-blue-600 text-white p-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Welcome, {userDetails.user_name || "User"}</h1>
              <p className="text-sm opacity-75">Manage your profile and appointments</p>
            </div>
            <div className="relative">
              <button
                className="relative bg-white text-blue-600 p-2 rounded-full shadow-md hover:bg-blue-100"
                onClick={() => setShowNotifications((prev) => !prev)}
              >
                <span className="material-icons">notifications</span>
                {notifications.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
              {unseenNotificationNumber}
            </span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-64 z-10">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleNotificationClick(notification)}
                >
                  
                  
                  <span 
                    className={notification.seenStatus === "unseen" 
                      ? "text-green-600" 
                      : "text-gray-600"}
                  >
                    Dr. {notification.doctorName} sent you a prescription at {notification.pcreationTime}
                  </span>
                
                
                </div>
              ))
            ) : (
              <p className="p-2 text-gray-500">No new notifications</p>
            )}
                </div>
              )}
            </div>
          </div>

           {/* Content Section */}
         <div className="p-8 space-y-6">
           {/* Personal Details */}
           <div className="bg-gray-100 p-6 rounded-lg shadow-md">
             <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
               Personal Details
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                 <p>
                   <span className="font-medium">Full Name: </span>
                   {userDetails.user_name || "Not available"}
                 </p>
                 <p>
                   <span className="font-medium">Email: </span>
                   {userDetails.email || "Not available"}
                 </p>
               </div>
               <div>
                 <p>
                   <span className="font-medium">Phone: </span>
                   {userDetails.phone || "Not available"}
                 </p>
                 <p>
                   <span className="font-medium">Address: </span>
                   {userDetails.address || "Not available"}
                 </p>
               </div>
             </div>
           </div>
           {/* Appointment History */}
           <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-red-100 p-6 rounded-lg shadow-md">
             <h2 className="text-2xl font-semibold border-b pb-2 mb-4 text-purple-800">
               Appointment History
             </h2>
             {error ? (
               <p className="text-red-500">{error}</p>
             ) : appointmentHistory.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {appointmentHistory.map((appointment, index) => (
                   <div
                     key={index}
                     className="bg-white border rounded-lg shadow-sm p-4"
                   >
                     <p>
                       <span className="font-medium text-purple-800">Status:</span>{" "}
                       <span className={getStatusClass(appointment.status)}>{appointment.status}</span>
                     </p>
                     <p>
                       <span className="font-medium text-purple-800">Patient Name:</span>{" "}
                       {appointment.patientName}
                     </p>
                     <p>
                       <span className="font-medium text-purple-800">Doctor Name:</span>{" "}
                       {appointment.doctorName}
                     </p>
                     <p>
                       <span className="font-medium text-purple-800">Specialization:</span>{" "}
                       {appointment.doctorDescription}
                     </p>
                     <p>
                       <span className="font-medium text-purple-800">Date:</span>{" "}
                       {new Date(appointment.appointmentDate).toLocaleString()}
                     </p>
                     {/* <p>
                       <span className="font-medium text-purple-800">Address:</span>{" "}
                       {appointment.address}
                     </p> */}

                     <p>
                       <span className="font-medium text-purple-800">contact number :</span>{" "}
                       {appointment.patientContactNumber}
                     </p>
                     {/* <div className="mt-4 flex gap-2">
                       <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">
                         Message
                       </button>
                       <button className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600">
                         Video Call
                       </button>
                     </div> */}
                   </div>
                 ))}
               </div>
             ) : (
               <p className="text-gray-500">No appointments found.</p>
             )}
           </div>
         </div>
         {/* Footer Section */}
         <div className="p-6 bg-gray-50 border-t">
           <div className="flex justify-between">
             <Link to="/edit-profile">
               {/* <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                 Edit Profile
               </button> */}
             </Link>
             <Link to="/login">
               <button
                 className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                 onClick={handleLogout}
               >
                 Log Out
               </button>
             </Link>
           </div>
         </div>
       </div>
     </div>
   );
 };
 export default UserProfile