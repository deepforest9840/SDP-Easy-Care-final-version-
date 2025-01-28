import React, { useState, useEffect } from "react";
import DoctorCard from "../Components/DoctorCard";
import AppointmentBookingCart from "../Components/AppointmentBookingCart";

const Doctors = () => {
  // State to hold the doctor data
  const [doctorsData, setDoctorsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // For the modal

  // Fetch doctor data from the backend API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(
          "http://localhost:9191/api/v1/doctors/all"
        ); // Correct endpoint
        const data = await response.json();

        if (data.message === "success") {
          // Map over the fetched data and format it
          const formattedData = data.data.map((doctor) => ({
            id: doctor.id,
            name: doctor.name,
            gmail: doctor.gmail,
            hospitalName: doctor.hospitalName,
            description: doctor.description,
            experience: doctor.experience,
            rating: doctor.rating,
            status: doctor.status,
            image: doctor.images?.[0]
              ? `http://localhost:9191${doctor.images[0].downloadUrl}`
              : "https://via.placeholder.com/150", // Placeholder if no image
            category: doctor.category?.name || "Uncategorized", // Default if category is null
          }));
          setDoctorsData(formattedData);
        } else {
          throw new Error("Failed to fetch doctor data");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []); // Empty dependency array means this runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gradient-to-r from-teal-50 via-teal-50 to-teal-100 min-h-screen flex items-center justify-center p-4">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctorsData.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onBookAppointment={() => setSelectedDoctor(doctor)} // Open modal for selected doctor
            />
          ))}
        </div>

        {/* Render the AppointmentBookingCart if a doctor is selected */}
        {selectedDoctor && (
          <AppointmentBookingCart
            doctor={selectedDoctor}
            onClose={() => setSelectedDoctor(null)} // Close modal
          />
        )}
      </div>
    </div>
  );
};

export default Doctors;
