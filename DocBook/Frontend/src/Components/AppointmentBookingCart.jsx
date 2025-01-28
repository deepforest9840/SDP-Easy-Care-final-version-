import React, { useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Set up modal styling
Modal.setAppElement("#root");

const AppointmentBookingCart = ({ doctorId , appid, name, area, noOfPatient, onClose }) => {
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    contactNumber: "",
    appointmentDate: new Date(),
    status: "Pending",
    dappointmentId: appid,    
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle date picker changes
  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      appointmentDate: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Log the appid, name, area, and noOfPatient before making the API call
    console.log("API Call Details:");
    console.log("appid:", appid);
    console.log("name:", name);
    console.log("area:", area);
    console.log("noOfPatient:", noOfPatient);
    noOfPatient++;
    console.log("Form Data:", formData);
    console.log("Doctor ID:", doctorId);
  
    try {
      // First API: Book the appointment with the doctor
      const response1 = await fetch(`http://localhost:9191/api/dappointments/book/${appid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response1.ok) throw new Error("Failed to book appointment");
  
      const contentType1 = response1.headers.get("Content-Type");
      let result1;
  
      if (contentType1 && contentType1.includes("application/json")) {
        result1 = await response1.json();
      } else {
        result1 = await response1.text();
      }
  
      console.log("Doctor appointment booked:", result1);
  
      // Second API: Submit the form data for the appointment
      console.log("Form Data:", formData," : doctorId: ",doctorId);
      const response2 = await fetch("http://localhost:9191/api/v1/newappointments/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          appointmentDate: formData.appointmentDate.toISOString(),
          doctorId,
        }),
      });
  
      if (!response2.ok) throw new Error("Failed to submit appointment");
  
      const contentType2 = response2.headers.get("Content-Type");
      let result2;
  
      if (contentType2 && contentType2.includes("application/json")) {
        result2 = await response2.json();
      } else {
        result2 = await response2.text();
      }
  
      console.log("Appointment confirmed:", result2);
  
      // Third API: Hospital stats API
      const hospitalStatsResponse = await fetch("http://localhost:9191/api/hospitalsstat/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appid,
          name,
          area,
          noOfPatient,
        }),
      });
  
      if (!hospitalStatsResponse.ok) throw new Error("Failed to submit hospital stats");
  
      const hospitalStatsContentType = hospitalStatsResponse.headers.get("Content-Type");
      let hospitalStatsResult;
  
      if (hospitalStatsContentType && hospitalStatsContentType.includes("application/json")) {
        hospitalStatsResult = await hospitalStatsResponse.json();
      } else {
        hospitalStatsResult = await hospitalStatsResponse.text();
      }
  
      console.log("Hospital stats confirmed:", hospitalStatsResult);
      onClose(); // Close modal on success
    } catch (error) {
      console.error("Error submitting appointment:", error);
    }
  };
  
  return (
    <Modal
      isOpen={!!doctorId}
      onRequestClose={onClose}
      style={{
        content: {
          maxWidth: "500px",
          margin: "auto",
          padding: "20px",
          borderRadius: "15px",
          backgroundColor: "#f9fafb",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <h2 className="text-2xl font-bold text-teal-600 mb-4 text-center">
        Book an Appointment
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Patient Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Patient Name:
          </label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-teal-400 rounded-lg focus:ring focus:ring-teal-300 outline-none"
            placeholder="Enter your full name"
          />
        </div>
        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-teal-400 rounded-lg focus:ring focus:ring-teal-300 outline-none"
            placeholder="Enter your email"
          />
        </div>
        {/* Contact Number */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Contact Number:
          </label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-teal-400 rounded-lg focus:ring focus:ring-teal-300 outline-none"
            placeholder="Enter your contact number"
          />
        </div>
        {/* Appointment Date */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Appointment Date:
          </label>
          <DatePicker
            selected={formData.appointmentDate}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="Pp"
            className="w-full px-4 py-2 border border-teal-400 rounded-lg focus:ring focus:ring-teal-300 outline-none"
          />
        </div>
        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="submit"
            className="px-6 py-2 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AppointmentBookingCart;

// import React, { useState } from "react";
// import Modal from "react-modal";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// Modal.setAppElement("#root");

// const AppointmentBookingCart = ({ doctorId, appid, name, area, noOfPatient, onClose }) => {
//   const [formData, setFormData] = useState({
//     patientName: "",
//     email: "",
//     contactNumber: "",
//     status: "Pending",
//     dappointmentId: appid,
//     appointmentDate: new Date(),
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleDateChange = (date) => {
//     setFormData((prev) => ({
//       ...prev,
//       appointmentDate: date,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       ...formData,
//       doctorId,
//       appointmentDate: formData.appointmentDate.toISOString(),
//     };

//     console.log("Submitting Payload:", payload);

//     try {
//       const response = await fetch("http://localhost:9191/api/v1/newappointments/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Server Error: ${errorText}`);
//       }

//       const result = await response.json();
//       console.log("Appointment booked successfully:", result);
//       onClose();
//     } catch (error) {
//       console.error("Error booking appointment:", error);
//     }
//   };

//   return (
//     <Modal
//       isOpen={!!doctorId}
//       onRequestClose={onClose}
//       style={{
//         content: {
//           maxWidth: "500px",
//           margin: "auto",
//           padding: "20px",
//           borderRadius: "15px",
//         },
//       }}
//     >
//       <h2>Book an Appointment</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Patient Name:</label>
//           <input
//             type="text"
//             name="patientName"
//             value={formData.patientName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Contact Number:</label>
//           <input
//             type="text"
//             name="contactNumber"
//             value={formData.contactNumber}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Appointment Date:</label>
//           <DatePicker
//             selected={formData.appointmentDate}
//             onChange={handleDateChange}
//             showTimeSelect
//             dateFormat="Pp"
//           />
//         </div>
//         <button type="submit">Submit</button>
//         <button type="button" onClick={onClose}>
//           Cancel
//         </button>
//       </form>
//     </Modal>
//   );
// };

// export default AppointmentBookingCart;