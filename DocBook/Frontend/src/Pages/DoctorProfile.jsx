import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

const DoctorProfile = () => {
  const location = useLocation();
  const Email = location.state?.email || localStorage.getItem("userEmail");
  const role = location.state?.role || localStorage.getItem("role");
  const status = location.state?.status || localStorage.getItem("status");

  const [doctorData, setDoctorData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await fetch(
          `http://localhost:9191/api/v1/DoctorAccount/getDoctorAccount?email=${encodeURIComponent(
            Email
          )}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch doctor data.");
        }
        const data = await response.json();
        setDoctorData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (Email) {
      fetchDoctorData();
    } else {
      setError("No Email Found");
    }
  }, [Email]);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("status");
    localStorage.removeItem("role");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-r from-purple-500 to-indigo-500 text-white h-full fixed left-0 top-0 shadow-lg">
        <div className="p-6 border-b border-indigo-600">
          <h2 className="text-2xl font-bold">Doctor Dashboard</h2>
        </div>
        <div className="p-4 space-y-6">
          <Link to="/dappointmenthistory">
            <button className="w-full bg-transparent text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-200 ease-in-out">
              Appointment History
            </button>
          </Link>
          <Link to="/applyappointment">
            <button className="w-full bg-transparent text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-200 ease-in-out">
              Create Appointment
            </button>
          </Link>
          <Link to="/apply">
            <button className="w-full bg-transparent text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-200 ease-in-out">
              Doctor Registration
            </button>
          </Link>
          <Link to="/showpatients">
            <button className="w-full bg-transparent text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-200 ease-in-out">
              View Patients
            </button>
          </Link>
          <Link to="/">
            <button className="w-full bg-transparent text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-200 ease-in-out">
              Manage Availability
            </button>
          </Link>
          <Link to="/login">
            <button
              className="w-full bg-transparent text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-200 ease-in-out"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 w-full bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white text-center py-6">
          {doctorData && (
            <p className="text-lg mt-2">Welcome, Dr. {doctorData.doctor_name}</p>
          )}
        </div>

        {/* Main Content Section */}
        <div className="p-6">
          {error && (
            <p className="text-red-500 text-center mb-4">Error: {error}</p>
          )}
          {doctorData ? (
            <>
              {/* Doctor Information */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-teal-600 mb-4">Profile Information</h2>
                <div className="p-4 border rounded-lg shadow-lg bg-gray-100">
                  <p className="text-gray-800">
                    <span className="font-bold">Name:</span> Dr. {doctorData.doctor_name}
                  </p>
                  <p className="text-gray-800">
                    <span className="font-bold">Email:</span> {doctorData.email}
                  </p>
                </div>
              </div>

              {/* Upcoming Features Section */}
              <div>
                <h2 className="text-2xl font-bold text-teal-600 mb-4">Upcoming Features</h2>
                <p className="text-gray-800">
                  Stay tuned for more features like patient messaging, video consultations, and
                  analytics dashboard!
                </p>
              </div>
            </>
          ) : (
            <p className="text-gray-800 text-center">Loading profile...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
