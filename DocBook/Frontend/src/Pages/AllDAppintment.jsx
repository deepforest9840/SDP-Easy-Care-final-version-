import React, { useState, useEffect } from "react";
import AllDAppointmentCard from "../Components/AllDAppointmentCard";
import AppointmentBookingCart from "../Components/AppointmentBookingCart";

const AllDAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Filter fields
  const [filters, setFilters] = useState({
    name: "",
    area: "",
    hospital: "",
    fee: "",
    category: "",
  });

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = `http://localhost:9191/api/dappointments/all`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (Array.isArray(data)) {
        const appointmentsWithDetails = await Promise.all(
          data.map(async (appointment) => {
            try {
              const doctorResponse = await fetch(
                `http://localhost:9191/api/v1/doctors/doctor/${appointment.doctorId}/doctor`
              );
              const doctorData = await doctorResponse.json();

              const hospitalResponse = await fetch(
                `http://localhost:9191/api/hospitals/by-id?id=${appointment.hospitalId}`
              );
              const hospitalData = await hospitalResponse.json();

              return {
                id: appointment.id,
                fee: appointment.fee,
                noOfPatient: appointment.noOfPatient,
                time: new Date(appointment.time).toLocaleString(),
                doctor: {
                  id: doctorData.data?.id,
                  name: doctorData.data?.name,
                  hospitalName: doctorData.data?.hospitalName,
                  gmail: doctorData.data?.gmail,
                  status: doctorData.data?.status,
                  rating: doctorData.data?.rating,
                  description: doctorData.data?.description,
                  experience: doctorData.data?.experience,
                  category: doctorData.data?.category?.name || "Uncategorized",
                  image: doctorData.data?.images?.[0]
                    ? `http://localhost:9191${doctorData.data.images[0].downloadUrl}`
                    : "https://via.placeholder.com/150",
                },
                hospital: {
                  name: hospitalData.name,
                  area: hospitalData.area,
                },
              };
            } catch (fetchError) {
              console.error("Error fetching details:", fetchError);
              return {
                ...appointment,
                doctor: {
                  id: "N/A",
                  name: "Unknown",
                  gmail: "N/A",
                  status: "N/A",
                  rating: "N/A",
                  hospitalName: "N/A",
                  description: "N/A",
                  experience: "N/A",
                  image: "https://via.placeholder.com/150",
                },
                hospital: {
                  name: "Unknown",
                  area: "N/A",
                },
              };
            }
          })
        );
        setAppointments(appointmentsWithDetails);
        setFilteredAppointments(appointmentsWithDetails);
      } else {
        throw new Error("Unexpected data format");
      }
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleFilter = () => {
    const { name, area, hospital, fee, category } = filters;

    const filtered = appointments.filter((appointment) => {
      const matchesName =
        name === "" ||
        (appointment.doctor.name &&
          appointment.doctor.name.toLowerCase().includes(name.toLowerCase()));
      const matchesArea =
        area === "" ||
        appointment.hospital.area.toLowerCase().includes(area.toLowerCase());
      const matchesHospital =
        hospital === "" ||
        appointment.hospital.name.toLowerCase().includes(hospital.toLowerCase());
      const matchesCategory =
        category === "" ||
        (appointment.doctor.category &&
          appointment.doctor.category.toLowerCase().includes(category.toLowerCase()));
      const matchesFee =
        fee === "" || appointment.fee <= parseFloat(fee);

      return (
        matchesName &&
        matchesArea &&
        matchesHospital &&
        matchesCategory &&
        matchesFee
      );
    });

    setFilteredAppointments(filtered);
  };

  const handleClearFilters = () => {
    setFilters({
      name: "",
      area: "",
      hospital: "",
      fee: "",
      category: "",
    });
    setFilteredAppointments(appointments);
  };

  const handleBookAppointment = (id) => {
    const selected = appointments.find((appointment) => appointment.id === id);
    setSelectedAppointment(selected);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gradient-to-r from-teal-50 via-teal-50 to-teal-100 min-h-screen flex items-center justify-center p-4">
      <div className="container mx-auto p-6">
        {/* Filter Inputs */}
        <div className="mb-4 flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Doctor Name"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Hospital Name"
            value={filters.hospital}
            onChange={(e) =>
              setFilters({ ...filters, hospital: e.target.value })
            }
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Hospital Area"
            value={filters.area}
            onChange={(e) => setFilters({ ...filters, area: e.target.value })}
            className="border rounded p-2"
          />
          <input
            type="number"
            placeholder="Max Fee"
            value={filters.fee}
            onChange={(e) => setFilters({ ...filters, fee: e.target.value })}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Doctor Specialist"
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
            className="border rounded p-2"
          />
          <button
            onClick={handleFilter}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Search
          </button>
          <button
            onClick={handleClearFilters}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Clear
          </button>
        </div>

        {/* Appointment Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {filteredAppointments.map((appointment) => (
            <AllDAppointmentCard
              key={appointment.id}
              appointment={appointment}
              onBookAppointment={handleBookAppointment}
            />
          ))}
        </div>

        {/* Booking Modal */}
        {selectedAppointment && (
          <AppointmentBookingCart
            doctorId={selectedAppointment.doctor.id}
            appid={selectedAppointment.id}
            tim={selectedAppointment.time}
            name={selectedAppointment.hospital.name}
            area={selectedAppointment.hospital.area}
            noOfPatient={selectedAppointment.noOfPatient}
            onClose={() => setSelectedAppointment(null)}
          />
        )}
      </div>
    </div>
  );
};

export default AllDAppointment;
