// import React from "react";
// import { useLocation, Link } from "react-router-dom";
// import jsPDF from "jspdf";

// const PrescriptionPage = () => {
//   const location = useLocation();
//   const { prescription } = location.state || {};

//   if (!prescription) {
//     return (
//       <div className="bg-gray-100 min-h-screen flex items-center justify-center">
//         <p className="text-gray-500">No prescription details available.</p>
//       </div>
//     );
//   }

//   // Function to generate PDF
//   const downloadPrescription = () => {
//     const doc = new jsPDF();

//     // Header Section
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(18);
//     doc.text("Prescription", 105, 20, null, null, "center");

//     doc.setFontSize(12);
//     doc.setFont("helvetica", "normal");
//     doc.text("Doctor Name: " + prescription.doctorName, 10, 40);
//     doc.text("Specialization: " + prescription.doctorDescription, 10, 50);
//     doc.text("Doctor Email: " + prescription.doctorEmail, 10, 60);

//     // Patient Section
//     doc.text("Patient Name: " + prescription.patientName, 10, 80);
//     doc.text("Patient Email: " + prescription.patientEmail, 10, 90);

//     // Appointment Section
//     doc.text(
//       "Appointment Date: " +
//         new Date(prescription.appointmentDate).toLocaleString(),
//       10,
//       110
//     );

//     // Medicines Section
//     doc.text("Medicines:", 10, 130);
//     prescription.medicines.forEach((medicine, index) => {
//       doc.text(`${index + 1}. ${medicine.name} - ${medicine.instruction}`, 10, 140 + index * 10);
//     });

//     // Footer
//     doc.text("Signature: __________________________", 10, 270);

//     // Save the PDF
//     doc.save("Prescription.pdf");
//   };

//   return (
//     <div className="bg-gradient-to-r from-blue-50 to-green-50 min-h-screen p-6">
//       {/* Prescription Card */}
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
//         {/* Header Section */}
//         <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 text-white">
//           <h1 className="text-3xl font-bold">{prescription.doctorName}</h1>
//           <p className="text-lg">{prescription.doctorDescription}</p>
//           <p className="text-sm opacity-80">{prescription.doctorEmail}</p>
//         </div>

//         {/* Body Content */}
//         <div className="p-6 space-y-6">
//           {/* Patient Details */}
//           <div className="border rounded-lg p-4 bg-gray-50 shadow">
//             <h2 className="text-xl font-semibold mb-2">Patient Details</h2>
//             <p>
//               <strong>Name:</strong> {prescription.patientName}
//             </p>
//             <p>
//               <strong>Email:</strong> {prescription.patientEmail}
//             </p>
//           </div>

//           {/* Appointment Details */}
//           <div className="border rounded-lg p-4 bg-gray-50 shadow">
//             <h2 className="text-xl font-semibold mb-2">Appointment Details</h2>
//             <p>
//               <strong>Date:</strong>{" "}
//               {new Date(prescription.appointmentDate).toLocaleDateString()}
//             </p>
//           </div>

//           {/* Medicines */}
//           <div className="border rounded-lg p-4 bg-gray-50 shadow">
//             <h2 className="text-xl font-semibold mb-2">Medicines</h2>
//             {prescription.medicines.length > 0 ? (
//               <ul className="list-disc ml-5">
//                 {prescription.medicines.map((medicine, index) => (
//                   <li key={index}>
//                     <strong>{medicine.name}:</strong> {medicine.instruction}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No medicines prescribed.</p>
//             )}
//           </div>
//         </div>

//         {/* Footer Section */}
//         <div className="p-6 bg-gray-100 border-t flex items-center justify-between">
//           <button
//             className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//             onClick={downloadPrescription}
//           >
//             Download Prescription
//           </button>
//           <Link to="/profile">
//             <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//               Back to Profile
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PrescriptionPage;


import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import jsPDF from "jspdf";
import axios from "axios";

const PrescriptionPage = () => {
  const location = useLocation();
  const { prescription } = location.state || {};
  const [rating, setRating] = useState(0);
  const [doctorId, setDoctorId] = useState(null);

  if (!prescription) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No prescription details available.</p>
      </div>
    );
  }

  // Function to generate PDF
  const downloadPrescription = () => {
    const doc = new jsPDF();

    // Header Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Prescription", 105, 20, null, null, "center");

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Doctor Name: " + prescription.doctorName, 10, 40);
    doc.text("Specialization: " + prescription.doctorDescription, 10, 50);
    doc.text("Doctor Email: " + prescription.doctorEmail, 10, 60);

    // Patient Section
    doc.text("Patient Name: " + prescription.patientName, 10, 80);
    doc.text("Patient Email: " + prescription.patientEmail, 10, 90);

    // Appointment Section
    doc.text(
      "Appointment Date: " +
        new Date(prescription.appointmentDate).toLocaleString(),
      10,
      110
    );

    // Medicines Section
    doc.text("Medicines:", 10, 130);
    prescription.medicines.forEach((medicine, index) => {
      doc.text(`${index + 1}. ${medicine.name} - ${medicine.instruction}`, 10, 140 + index * 10);
    });

    // Footer
    doc.text("Signature: __________________________", 10, 270);

    // Save the PDF
    doc.save("Prescription.pdf");
  };

  // Fetch doctorId
  const fetchDoctorId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9191/api/v1/auth/get-doctor-id?email=${prescription.doctorEmail}`
      );
      setDoctorId(response.data);
    } catch (error) {
      console.error("Error fetching doctor ID:", error);
    }
  };

  // Post rating
  const submitRating = async () => {
    if (!doctorId) {
      console.error("Doctor ID is not available.");
      return;
    }
    try {
      await axios.post(
        `http://localhost:9191/api/v1/doctors/${doctorId}/calculate-rating?rate=${rating}`
      );
      alert("Rating submitted successfully!");
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  // Update rating state
  const handleStarClick = (star) => {
    setRating(star);
  };

  // Fetch doctorId on component mount
  React.useEffect(() => {
    fetchDoctorId();
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 min-h-screen p-6">
      {/* Prescription Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 text-white">
          <h1 className="text-3xl font-bold">{prescription.doctorName}</h1>
          <p className="text-lg">{prescription.doctorDescription}</p>
          <p className="text-sm opacity-80">{prescription.doctorEmail}</p>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6">
          {/* Patient Details */}
          <div className="border rounded-lg p-4 bg-gray-50 shadow">
            <h2 className="text-xl font-semibold mb-2">Patient Details</h2>
            <p>
              <strong>Name:</strong> {prescription.patientName}
            </p>
            <p>
              <strong>Email:</strong> {prescription.patientEmail}
            </p>
          </div>

          {/* Appointment Details */}
          <div className="border rounded-lg p-4 bg-gray-50 shadow">
            <h2 className="text-xl font-semibold mb-2">Appointment Details</h2>
            <p>
              <strong>Date:</strong> {new Date(prescription.appointmentDate).toLocaleDateString()}
            </p>
          </div>

          {/* Medicines */}
          <div className="border rounded-lg p-4 bg-gray-50 shadow">
            <h2 className="text-xl font-semibold mb-2">Medicines</h2>
            {prescription.medicines.length > 0 ? (
              <ul className="list-disc ml-5">
                {prescription.medicines.map((medicine, index) => (
                  <li key={index}>
                    <strong>{medicine.name}:</strong> {medicine.instruction}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No medicines prescribed.</p>
            )}
          </div>
        </div>

        {/* Footer Section */}
        <div className="p-6 bg-gray-100 border-t flex items-center justify-between">
          <button
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={downloadPrescription}
          >
            Download Prescription
          </button>
          
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`text-xl ${rating >= star ? "text-yellow-500" : "text-gray-400"}`}
                onClick={() => handleStarClick(star)}
              >
                ★
              </button>
            ))}
            <button
              className="ml-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={submitRating}
            >
              Submit Rating
            </button>
          </div>
          
          {/* <Link to="/profile">
            <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Back to Profile
            </button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default PrescriptionPage;