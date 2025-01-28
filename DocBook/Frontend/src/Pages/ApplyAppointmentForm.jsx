import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

const ApplyAppointmentForm = () => {

  const email = localStorage.getItem("userEmail") ;
  const role = localStorage.getItem("role") ;
  console.log("email : ",email," role : ",role) ;

  const [time, setTime] = useState(null); // State to store the time
  const [doctorId, setDoctorId] = useState(null); // Separate doctorId state
  const [formData, setFormData] = useState({
    doctorId: 0,
    hospitalId: null,
    time: "",
    fee: 0,
    area: "",
    name: "",
  });

  const [areas, setAreas] = useState(["mirpur", "dhanmondi", "chankarpul","mohakhali", "savar", "gazipur",  "uttara"]);
  const [suggestedNames, setSuggestedNames] = useState(["popular", "square","labaid", "ibnsina"]);
  const [error, setError] = useState(null);
  const [hospitalStatus, setHospitalStatus] = useState("");

  useEffect(() => {
    // Fetch doctorId
    fetch(`http://localhost:9191/api/v1/auth/get-doctor-id?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log("Fetched doctorId:", data); // Log doctorId
          setDoctorId(data); // Set doctorId in state
          console.log("Doctor ID:", data);
          setFormData((prev) => ({ ...prev, doctorId: data })); // Update formData
        }
      })
      .catch((error) => {
        console.error("Error fetching doctor ID:", error);
        setError("Failed to fetch doctor ID");
      });

    const currentTime = new Date(); // Or any other logic for the time
    setTime(currentTime);
  }, []);

  const handleAreaChange = (e) => {
    const area = e.target.value;
    setFormData((prev) => ({ ...prev, area }));
    setHospitalStatus(""); // Reset status on area change
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setFormData((prev) => ({ ...prev, name }));
    setHospitalStatus(""); // Reset status on name change
  };
  const fetchHospitalId = async () => {
    const { name, area } = formData;
  
    try {
      setError(null); // Reset error
      setHospitalStatus("Fetching hospital...");
      const response = await fetch(
        `http://localhost:9191/api/hospitals/by-name-and-area?name=${name}&area=${area}`
      );
  
      if (response.ok) {
        const data = await response.json(); // The response is directly the hospital ID
        console.log("Fetched hospitalId:", data); // Log the response directly
  
        if (data) {
          setFormData((prev) => ({ ...prev, hospitalId: data })); // Set the hospitalId
          setHospitalStatus("Hospital found!");
        } else {
          throw new Error("Hospital not found!");
        }
      } else {
        throw new Error("Failed to fetch hospital data");
      }
    } catch (err) {
      setError(err.message);
      setFormData((prev) => ({ ...prev, hospitalId: null })); // Clear hospital ID on error
      setHospitalStatus("Hospital not found!");
    }
  };
  
  const handleDateChange = (date) => {
    // Convert to ISO string and ensure milliseconds are included
    const isoDate = date.toISOString();  // "2025-01-10T03:46:54.616Z"
    const formattedTime = isoDate.slice(0, -1);  // "2025-01-10T03:46:54.616"
    setFormData((prev) => ({ ...prev, time: formattedTime }));
  };

  const handleFeeChange = (e) => {
    const fee = parseInt(e.target.value, 10) || 0;
    setFormData((prev) => ({ ...prev, fee }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if doctorId is available before submitting
    if (!doctorId || !formData.hospitalId) {
      alert("Doctor ID or Hospital ID is missing. Please try again.");
      console.log("Doctor ID:", doctorId);
      console.log("Hospital ID:", formData.hospitalId);
      return;
    }

    const appointmentData = {
      doctorId: doctorId,  // Ensure doctorId is used correctly here
      hospitalId: formData.hospitalId,  // Use the hospitalId from formData
      time: formData.time,  // Send the formatted time here
      fee: formData.fee,
    };

    fetch('http://localhost:9191/api/dappointments/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          alert('Failed to add appointment');
        } else {
          alert('Appointment added successfully');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while adding the appointment');
      });
  };

  return (
    <div className="bg-gradient-to-r from-teal-50 via-teal-50 to-teal-100 min-h-screen flex items-center justify-center p-4">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg max-w-4xl">
        <h1 className="text-2xl font-semibold text-center text-teal-600 mb-6">
          Apply for creating a Appointment Schedule
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Area */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Area
            </label>
            <select
              value={formData.area}
              onChange={handleAreaChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
            >
              <option value="">Select Area</option>
              {areas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Hospital Name
            </label>
            <select
              value={formData.name}
              onChange={handleNameChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
            >
              <option value="">Select Hospital</option>
              {suggestedNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={fetchHospitalId}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Fetch Hospital ID
          </button>
          <p className={`text-sm ${hospitalStatus === "Hospital found!" ? "text-green-500" : "text-red-500"}`}>
            {hospitalStatus}
          </p>

          {/* Appointment Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Appointment Date:
            </label>
            <DatePicker
              selected={formData.time ? new Date(formData.time) : null}
              onChange={handleDateChange}
              showTimeSelect
              dateFormat="yyyy-MM-dd'T'HH:mm:ss"
              className="w-full px-4 py-2 border border-teal-400 rounded-lg focus:ring focus:ring-teal-300 outline-none"
            />
          </div>

          {/* Fee */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Consultation Fee
            </label>
            <input
              type="number"
              value={formData.fee}
              onChange={handleFeeChange}
              placeholder="Enter consultation fee"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-2 bg-[#00A9E0] text-white text-lg font-medium rounded-lg hover:bg-teal-700"
            >
              Apply
            </button>
          </div>
          <div className="text-red-500 text-center">

            {/* <Link to="/doctorProfile" >
              <button className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 shadow transition">
                  back to doctor profile  
              </button>
            </Link> */}
          </div>
          
         
        </form>
      </div>
    </div>
  );
};

export default ApplyAppointmentForm;
