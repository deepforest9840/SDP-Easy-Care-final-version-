// import React, { useEffect, useState } from "react";

// const AllDAppointmentCard = ({ appointment, onBookAppointment }) => {
//   const { fee, noOfPatient, time, doctor = {}, hospital = {} } = appointment;

//   const [countdown, setCountdown] = useState("");

//   useEffect(() => {
//     const calculateCountdown = () => {
//       const now = new Date();
//       const targetDate = new Date(time);
//       const diff = targetDate - now;

//       if (diff <= 0) {
//         setCountdown("Appointment time has passed.");
//         return;
//       }

//       const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
//       const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((diff % (1000 * 60)) / 1000);

//       setCountdown(
//         `Left: ${months} month${months !== 1 ? "s" : ""}, ${days} day${days !== 1 ? "s" : ""}, ${hours} h, ${minutes} min, ${seconds} sec`
//       );
//     };

//     calculateCountdown();
//     const intervalId = setInterval(calculateCountdown, 1000);

//     return () => clearInterval(intervalId);
//   }, [time]);

//   return (
//     <div className="w-64 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
//       <div className="relative w-32 h-32 overflow-hidden rounded-full mx-auto mt-4">
//         <img
//           className="object-cover w-full h-full"
//           src={doctor.image || "https://via.placeholder.com/150"}
//           alt={`${doctor.name || "Unknown"} Profile`}
//         />
//       </div>

//       <div className="p-4">
//         <h2 className="text-lg font-bold text-gray-800 truncate">
//           {doctor.name || "Unknown Doctor"}
//         </h2>
//         <p className="text-sm text-blue-500 truncate">
//           Email: {doctor.gmail || "N/A"}
//         </p>
//         <p className="text-sm text-blue-500 truncate">
//           Specialist: {doctor.category || "N/A"}
//         </p>
//         <p className="text-sm text-gray-700">Status: {doctor.status || "N/A"}</p>
//         <p className="text-gray-600 text-xs mb-3 line-clamp-2">
//           Description: {doctor.description || "N/A"}
//         </p>
//         <p className="text-xs text-green-500 mb-2">
//           Experience: {doctor.experience || 0} years
//         </p>
//         <p className="text-xs text-green-500 mb-2">
//           Passed Hopital: {doctor.hospitalName || 0} 
//         </p>
//         <span className="text-[10px] bg-blue-100 text-blue-500 px-2 py-0.5 rounded-full inline-block mb-2">
//           Hospital: {hospital.name || "Unknown"} ({hospital.area || "N/A"})
//         </span>
//         <span className="text-[10px] bg-yellow-100 text-yellow-500 px-2 py-0.5 rounded-full inline-block mb-2">
//           Rating: {doctor.rating || "N/A"}
//         </span>
//         <span className="text-[10px] bg-green-100 text-green-500 px-2 py-0.5 rounded-full inline-block mb-2">
//           Fee: {fee} BDT
//         </span>
//         <span className="text-[10px] bg-orange-100 text-orange-500 px-2 py-0.5 rounded-full inline-block mb-2">
//           Patients: {noOfPatient}
//         </span>
//         <p className="text-xs text-gray-700 mb-3">
//           Time: {new Date(time).toLocaleString()}{" "}
//           <span className="text-blue-500 font-semibold">{countdown}</span>
//         </p>

//         <button
//           onClick={() => onBookAppointment(appointment.id)}
//           className="mt-3 bg-[#00A9E0] text-white px-3 py-1.5 rounded text-sm hover:bg-teal-700 w-full transition-colors"
//         >
//           Book Appointment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AllDAppointmentCard;


import React, { useEffect, useState } from "react";

const AllDAppointmentCard = ({ appointment, onBookAppointment }) => {
  const { fee, noOfPatient, time, doctor = {}, hospital = {} } = appointment;

  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const targetDate = new Date(time);
      const diff = targetDate - now;

      if (diff <= 0) {
        setCountdown("Appointment time has passed.");
        return;
      }

      const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
      const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown(
        `Left: ${months} month${months !== 1 ? "s" : ""}, ${days} day${days !== 1 ? "s" : ""}, ${hours} h, ${minutes} min, ${seconds} sec`
      );
    };

    calculateCountdown();
    const intervalId = setInterval(calculateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  return (
    <div className="w-64 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="relative w-32 h-32 overflow-hidden rounded-full mx-auto mt-4">
        <img
          className="object-cover w-full h-full"
          src={doctor.image || "https://via.placeholder.com/150"}
          alt={`${doctor.name || "Unknown"} Profile`}
        />
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800 truncate">
          {doctor.name || "Unknown Doctor"}
        </h2>
        <p className="text-sm text-blue-500 truncate">
          Email: {doctor.gmail || "N/A"}
        </p>
        <p className="text-sm text-blue-500 truncate">
          Specialist: {doctor.category || "N/A"}
        </p>
        <p className="text-sm text-gray-700">Status: {doctor.status || "N/A"}</p>
        <p className="text-gray-600 text-xs mb-3 line-clamp-2">
          Description: {doctor.description || "N/A"}
        </p>
        <p className="text-xs text-green-500 mb-2">
          Experience: {doctor.experience || 0} years
        </p>
        <p className="text-xs text-green-500 mb-2">
          Passed Hopital: {doctor.hospitalName || 0} 
        </p>
        <span className="text-[10px] bg-blue-100 text-blue-500 px-2 py-0.5 rounded-full inline-block mb-2">
          Hospital: {hospital.name || "Unknown"} ({hospital.area || "N/A"})
        </span>
        <span className="text-[10px] bg-yellow-100 text-yellow-500 px-2 py-0.5 rounded-full inline-block mb-2">
  Rating: {doctor.rating > 5 ? 5 : doctor.rating || "N/A"}⭐
</span>

        <span className="text-[10px] bg-green-100 text-green-500 px-2 py-0.5 rounded-full inline-block mb-2">
          Fee: {fee} BDT
        </span>
        <span className="text-[10px] bg-orange-100 text-orange-500 px-2 py-0.5 rounded-full inline-block mb-2">
          Patients: {noOfPatient}
        </span>
        <p className="text-xs text-gray-700 mb-3">
          Time: {new Date(time).toLocaleString()}{" "}
          <span className="text-blue-500 font-semibold">{countdown}</span>
        </p>

        <button
          onClick={() => onBookAppointment(appointment.id)}
          className="mt-3 bg-[#00A9E0] text-white px-3 py-1.5 rounded text-sm hover:bg-teal-700 w-full transition-colors"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default AllDAppointmentCard;