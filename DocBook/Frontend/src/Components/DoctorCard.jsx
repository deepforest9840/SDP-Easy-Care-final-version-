import React from "react";

const DoctorCard = ({ doctor, onBookAppointment }) => {
  return (
    <div className="w-64 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      {/* Doctor Image */}
      <div className="relative w-32 h-32 overflow-hidden rounded-full mx-auto mt-4">
        <img
          className="object-cover w-full h-full"
          src={doctor.image}
          alt={`${doctor.name} Profile`}
        />
      </div>

      <div className="p-4">
        {/* Doctor Name */}
        <h2 className="text-lg font-bold text-gray-800 truncate">
          {doctor.name}
        </h2>

        {/* Specialty */}
        <p className="text-xs text-blue-500 mb-1">Specialty: {doctor.category}</p>

        {/* Consultation Fee */}
        {/* <p className="text-gray-700 font-medium text-sm">
          Fee: ${doctor.price}
        </p> */}

        {/* Experience */}
        <p className="text-xs text-green-500 mb-2">
          Experience: {doctor.experience} years
        </p>

        {/* Description */}
        <p className="text-gray-600 text-xs mb-3 line-clamp-2">
         Description: {doctor.description}
        </p>

        {/* Category */}
        <span className="text-[10px] bg-blue-100 text-blue-500 px-2 py-0.5 rounded-full inline-block mb-2">
          Hospital:    {doctor.hospitalName}
        </span>
        <span className="text-[10px] bg-blue-100 text-blue-500 px-2 py-0.5 rounded-full inline-block mb-2">
          Rating:    {doctor.rating}
        </span>
        <span className="text-[10px] bg-blue-100 text-blue-500 px-2 py-0.5 rounded-full inline-block mb-2">
          Mail:    {doctor.gmail}
        </span>
        {/* Book Appointment Button */}
        <button
          onClick={onBookAppointment}
          className="mt-3 bg-[#00A9E0] text-white px-3 py-1.5 rounded text-sm hover:bg-teal-700 w-full transition-colors"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
