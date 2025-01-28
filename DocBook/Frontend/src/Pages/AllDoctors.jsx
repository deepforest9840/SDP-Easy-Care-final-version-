import React, { useState, useEffect } from "react";
import AllDoctorCard from "../Components/AllDoctorCard";
import AppointmentBookingCart from "../Components/AppointmentBookingCart";

const AllDoctors = () => {
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
            noOfPatients: doctor.noOfPatients,
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
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-medium text-gray-600">Loading doctors...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100">
        <p className="text-lg font-medium text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-r from-teal-50 via-teal-50 to-teal-100 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {doctorsData.map((doctor) => (
            <AllDoctorCard
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
    </section>
  );
};

export default AllDoctors;
