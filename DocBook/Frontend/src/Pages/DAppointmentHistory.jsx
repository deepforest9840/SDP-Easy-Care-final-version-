import React, { useState, useEffect } from "react";
import DAppointmentHistoryCard from "../Components/DAppointmentHistoryCard";
import { Link } from "react-router-dom";

const DAppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [doctorId, setDoctorId] = useState(null);

  const Email = localStorage.getItem("userEmail");

  const [filters, setFilters] = useState({
    name: "",
    area: "",
    fee: "",
  });

  const fetchDoctorId = async () => {
    try {
      const response = await fetch(
        `http://localhost:9191/api/v1/auth/get-doctor-id?email=${Email}`
      );
      const data = await response.json();
      setDoctorId(data);
      console.log("Fetched doctorId:", data);
    } catch (err) {
      console.error("Error fetching doctor ID:", err);
      setError("Unable to fetch doctor ID.");
    }
  };

  const updateAppointmentStatus = async (doctorId, appointmentId) => {
    try {
      const response = await fetch(
        `http://localhost:9191/api/v1/newappointments/deleteAppointmentByDoctorAndNotifyPatients?doctorId=${doctorId}&DAppointmentId=${appointmentId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update appointment status.");
      }

      const data = await response.json();
      console.log("Appointment status updated:", data);
    } catch (err) {
      console.error("Error updating appointment status:", err);
      setError("Failed to update appointment status.");
    }
  };

  const fetchAppointments = async () => {
    if (!doctorId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:9191/api/dappointments/all`);
      const data = await response.json();

      if (Array.isArray(data)) {
        const filteredAppointments = data.filter(
          (appointment) => appointment.doctorId === doctorId
        );

        const appointmentsWithDetails = await Promise.all(
          filteredAppointments.map(async (appointment) => {
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
                  area: hospitalData.area || "N/A",
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
      } else {
        throw new Error("Unexpected data format");
      }
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const filtered = appointments.filter((appointment) => {
      const matchesName = filters.name
        ? appointment.doctor.name
            .toLowerCase()
            .includes(filters.name.toLowerCase())
        : true;
      const matchesArea = filters.area
        ? appointment.hospital.area
            .toLowerCase()
            .includes(filters.area.toLowerCase())
        : true;
      const matchesFee = filters.fee
        ? appointment.fee <= parseFloat(filters.fee)
        : true;
      return matchesName && matchesArea && matchesFee;
    });
    setAppointments(filtered);
  };

  const deleteAppointment = async (appointmentId) => {
    try {
      const response = await fetch(
        `http://localhost:9191/api/dappointments/${appointmentId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Deleting appointment with ID:", appointmentId);

        await updateAppointmentStatus(doctorId, appointmentId);

        setAppointments((prev) =>
          prev.filter((appointment) => appointment.id !== appointmentId)
        );
        if (selectedAppointment?.id === appointmentId) {
          setSelectedAppointment(null);
        }
      } else {
        throw new Error("Failed to delete the appointment.");
      }
    } catch (err) {
      console.error("Error deleting the appointment:", err);
      setError("Error deleting the appointment.");
    }
  };

  useEffect(() => {
    fetchDoctorId();
  }, [Email]);

  useEffect(() => {
    if (doctorId) {
      fetchAppointments();
    }
  }, [doctorId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gradient-to-r from-teal-50 via-teal-50 to-teal-100 min-h-screen flex items-center justify-center p-4">
      <div className="container mx-auto p-6">
        <div className="mb-4 flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Name"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Area"
            value={filters.area}
            onChange={(e) => setFilters({ ...filters, area: e.target.value })}
            className="border rounded p-2"
          />
          <input
            type="number"
            placeholder="Fee"
            value={filters.fee}
            onChange={(e) => setFilters({ ...filters, fee: e.target.value })}
            className="border rounded p-2"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment) => (
            <DAppointmentHistoryCard
              key={appointment.id}
              appointment={appointment}
              onDeleteAppointment={deleteAppointment}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto p-6">
        {/* <Link to="/doctorProfile">
          <button className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 shadow transition">
            Go back to Doctor's Profile
          </button>
        </Link> */}
      </div>
    </div>
  );
};

export default DAppointmentHistory;
