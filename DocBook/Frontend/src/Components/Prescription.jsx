import React, { useState } from "react";

const Prescription = ({ appointment }) => {
  const [medicines, setMedicines] = useState([{ name: "", instruction: "" }]);

  // Handle input change for medicine fields
  const handleInputChange = (index, field, value) => {
    const updatedMedicines = medicines.map((medicine, i) =>
      i === index ? { ...medicine, [field]: value } : medicine
    );
    setMedicines(updatedMedicines);
  };

  // Add a new medicine row
  const addMedicineRow = () => {
    setMedicines([...medicines, { name: "", instruction: "" }]);
  };
  

  // Prepare formatted data to send to the backend
  const handleSubmit = () => {
    const dataToSend = {
      patientEmail: appointment.patientEmail,
      patientName: appointment.patientName,
      doctorName: appointment.doctorName,
      doctorEmail: appointment.doctorEmail,
      doctorDescription: appointment.doctorDescription,
      appointmentDate: appointment.appointmentDate,
      dappointmentId: appointment.dappointmentId, 
      appointmentId: appointment.appointmentId,   
      seenStatus:"unseen",  
      medicines,
    };
    console.log("Formatted Data:", dataToSend);

    // Send data to backend (replace URL with your endpoint)
    fetch("http://localhost:9191/api/v1/prescriptions/addprescription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save prescription");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Prescription saved successfully:", data);
        //onClose(); // Close the prescription modal after submission
      })
      .catch((error) => {
        console.error("Error saving prescription:", error);
      });
  };

  if (!appointment) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-2xl font-bold">Prescription</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={() => window.history.back()}
          >
            ✖
          </button>
        </div>

        <div className="space-y-4">
          <p>
            <strong>Doctor Name:</strong> {appointment.doctorName}
          </p>
          <p>
            <strong>Specialization:</strong> {appointment.doctorDescription}
          </p>
          <p>
            <strong>Patient Name:</strong> {appointment.patientName}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(appointment.appointmentDate).toLocaleDateString()}
          </p>

          <div className="border-t pt-4">
            <h3 className="font-semibold">Medicines</h3>
            {medicines.map((medicine, index) => (
              <div key={index} className="flex items-center gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Medicine Name"
                  value={medicine.name}
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                  className="border p-2 rounded w-1/2"
                />
                <input
                  type="text"
                  placeholder="Instruction"
                  value={medicine.instruction}
                  onChange={(e) =>
                    handleInputChange(index, "instruction", e.target.value)
                  }
                  className="border p-2 rounded w-1/2"
                />
                {index === medicines.length - 1 && (
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                    onClick={addMedicineRow}
                  >
                    +
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <button
              className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Save Prescription
            </button>
            <button
              className="bg-gray-500 text-white py-2 px-6 rounded hover:bg-gray-600 ml-4"
              onClick={() => window.history.back()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prescription;
