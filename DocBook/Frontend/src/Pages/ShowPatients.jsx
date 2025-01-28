
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Prescription from "../Components/Prescription";

const ShowPatients = () => {
  const navigate = useNavigate();
  const UserEmail = localStorage.getItem("userEmail")?.trim();
  const [doctorId, setDoctorId] = useState(null); // Start with null
  const [appointmentHistory, setAppointmentHistory] = useState([]);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null); // State to store the selected appointment  


  // Fetch doctor ID
  useEffect(() => {
    fetch(`http://localhost:9191/api/v1/auth/get-doctor-id?email=${UserEmail}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setDoctorId(data); // Set doctorId in state
        }
      })
      .catch((error) => {
        setError("Failed to fetch doctor ID");
      });
  }, []);

  // Fetch appointments when doctorId is set
  useEffect(() => {
    if (!doctorId) return; // Don't fetch appointments if doctorId is null

    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `http://localhost:9191/api/v1/newappointments/getAppointmentsByDoctorId?doctorId=${encodeURIComponent(doctorId)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch appointment data");
        }

        const data = await response.json();
        setAppointmentHistory(data);
        console.log("Appointment History:", data);
      } catch (error) {
        setError("Unable to load appointment data. Please try again.");
      }
    };

    fetchAppointments();
  }, [doctorId]);

  const handleCreatePrescription = (appointment) => {
    setSelectedAppointment(appointment);
  };
 
  const handleMessageClick = (appointment) => {
    navigate("/message", { state: { appointment } });
  };

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 via-white to-blue-50 min-h-screen p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Header Section */}
      <div className="bg-blue-600 text-white p-6">
        <h1 className="text-3xl font-bold">Welcome to the Appointment Page</h1>
        <p className="text-sm opacity-75">Manage your appointments here</p>
      </div>

      {/* Content Section */}
      <div className="p-8 space-y-6">
        {/* Appointment History */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Appointment History</h2>

        {error ? (
          <p className="text-red-500">{error}</p>
        ) : appointmentHistory.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointmentHistory.map((appointment, index) => (
            <div key={index} className="bg-white border rounded-lg shadow-sm p-4">
            <div className="flex flex-col gap-2">
              <p>
                <span className="font-medium">status : </span>{" "}
                  {appointment.status}
              </p>
              
              <p>
              <span className="font-medium">Patient Name:</span> {appointment.patientName}
              </p>
              <p>
              <span className="font-medium">Doctor Name:</span> {appointment.doctorName}
              </p>
              <p>
              <span className="font-medium">Specialization:</span> {appointment.doctorDescription}
              </p>
              <p>
              <span className="font-medium">Date:</span> {new Date(appointment.appointmentDate).toLocaleString()}
              </p>
              <p>
              <span className="font-medium">contact :</span> {appointment.patientContactNumber || "Not provided"}
              </p>
            </div>

            <button
              className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition"
              onClick={() => handleCreatePrescription(appointment)}>
              Create Prescription
            </button>

            {/* <div className="mt-4 flex gap-4">
              <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              onClick={() => handleMessageClick(appointment)}
              >
              Message
              </button>
              <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition">
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
      </div>

      {/* Prescription Modal */}
      {selectedAppointment && (
        <Prescription appointment={selectedAppointment} />
         
      )}
    </div>
    );
};

export default ShowPatients;
