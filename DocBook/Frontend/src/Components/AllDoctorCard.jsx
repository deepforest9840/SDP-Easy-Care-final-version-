// import React from "react";

// const AllDoctorCard = ({ doctor, onBookAppointment }) => {
//   return (
//     <div className="w-72 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
//       {/* Doctor Image */}
//       <div className="relative w-32 h-32 overflow-hidden rounded-full mx-auto mt-4 border-4 border-teal-500">
//         <img
//           className="object-cover w-full h-full"
//           src={doctor.image}
//           alt={`${doctor.name} Profile`}
//         />
//       </div>

//       <div className="p-6">
//         {/* Doctor Name */}
//         <h2 className="text-2xl font-semibold text-gray-800 mb-2 truncate">{doctor.name}</h2>

//         {/* Specialty */}
//         <p className="text-sm text-teal-600 font-medium mb-1">{doctor.category}</p>

//         {/* Experience */}
//         <p className="text-xs text-gray-500 mb-3">
//           <span className="font-medium text-gray-700">Experience:</span> {doctor.experience} years
//         </p>

//         {/* Description */}
//         <p className="text-gray-600 text-sm mb-4 line-clamp-3">
//           {doctor.description}
//         </p>

//         {/* Hospital, Rating, and Email */}
//         <div className="flex flex-wrap space-x-2 mb-4">
//           {/* Hospital Name */}
//           <span className="text-xs bg-teal-100 text-teal-600 px-3 py-1 rounded-full">
//             {doctor.hospitalName}
//           </span>

//           {/* Rating */}
//           <span className="text-xs bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full">
//             Rating: {doctor.rating}⭐
//           </span>

//           {/* Email */}
//           <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
//             {doctor.gmail}
//           </span>
//         </div>

     
//       </div>
//     </div>
//   );
// };

// export default AllDoctorCard;

import React from "react";

const AllDoctorCard = ({ doctor, onBookAppointment }) => {
  return (
    <div className="w-72 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
      {/* Doctor Image */}
      <div className="relative w-32 h-32 overflow-hidden rounded-full mx-auto mt-4 border-4 border-teal-500">
        <img
          className="object-cover w-full h-full"
          src={doctor.image}
          alt={`${doctor.name} Profile`}
        />
      </div>

      <div className="p-6">
        {/* Doctor Name */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 truncate">{doctor.name}</h2>

        {/* Specialty */}
        <p className="text-sm text-teal-600 font-medium mb-1">{doctor.category}</p>

        {/* Experience */}
        <p className="text-xs text-gray-500 mb-3">
          <span className="font-medium text-gray-700">Experience:</span> {doctor.experience} years
        </p>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {doctor.description}
        </p>

        {/* Hospital, Rating, and Email */}
        <div className="flex flex-wrap space-x-2 mb-4">
          {/* Hospital Name */}
          <span className="text-xs bg-teal-100 text-teal-600 px-3 py-1 rounded-full">
            {doctor.hospitalName}
          </span>

          {/* Rating */}
          <span className="text-[10px] bg-yellow-100 text-yellow-500 px-2 py-0.5 rounded-full inline-block mb-2">
  Rating: {doctor.rating > 5 ? 5 : doctor.rating || "N/A"}⭐
</span>


          {/* Email */}
          <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
            {doctor.gmail}
          </span>
        </div>

     
      </div>
    </div>
  );
};

export default AllDoctorCard;