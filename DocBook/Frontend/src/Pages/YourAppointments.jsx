import React, { useState, useEffect } from "react";

const YourAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:9191/api/v1/newappointments/getAll");
        if (!response.ok) {
          throw new Error("Failed to fetch appointments.");
        }
        const data = await response.json();
        setAppointments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-teal-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-teal-50 via-teal-50 to-teal-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-teal-600 mb-6">
          Your Appointments
        </h1>

        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex flex-col md:flex-row items-center bg-gradient-to-r from-teal-50 to-white rounded-md shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Patient Image */}
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-lg shadow-md mb-4 md:mb-0 md:mr-4">
                  {appointment.patientName?.[0]?.toUpperCase() || "P"}
                </div>

                {/* Appointment Details */}
                <div className="flex-1">
                  <h2 className="text-lg md:text-xl font-semibold text-teal-800">
                    Patient: {appointment.patientName}
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base mt-1">
                    <span className="font-medium text-gray-800">Contact:</span>{" "}
                    {appointment.contactNumber}
                  </p>
                  <p className="text-gray-600 text-sm md:text-base mt-1">
                    <span className="font-medium text-gray-800">Doctor ID:</span>{" "}
                    {appointment.doctorId}
                  </p>
                  <p className="text-gray-600 text-sm md:text-base mt-1">
                    <span className="font-medium text-gray-800">Date:</span>{" "}
                    {new Date(appointment.appointmentDate).toLocaleString()}
                  </p>
                </div>

                {/* View Details Button */}
                <div className="mt-4 md:mt-0 md:ml-4">
                  <button className="py-1.5 px-3 bg-[#00A9E0] text-white font-medium text-xs md:text-sm rounded-md shadow-md hover:bg-teal-600 transition duration-200">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default YourAppointments;
