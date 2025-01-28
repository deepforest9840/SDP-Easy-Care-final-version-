// import React from 'react';

// const DonorCard = ({ donor }) => {
//   return (
//     <div className="border p-4 rounded-lg shadow-md mb-4">
//       <h2 className="text-xl font-bold">{donor.name}</h2>
//       <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
//       <p><strong>Location:</strong> {donor.location}</p>
//       <p><strong>Phone:</strong> {donor.phone}</p>
//       <p><strong>Email:</strong> {donor.email}</p>
//     </div>
//   );
// };

// export default DonorCard;

import React from "react";
import { Droplet } from "lucide-react"; // Importing blood droplet icon from lucide-react

const DonorCard = ({ donor }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md mb-4 flex items-center space-x-4">
      <div className="flex-shrink-0 bg-red-100 p-4 rounded-full">
        <Droplet className="text-red-500 w-8 h-8" /> {/* Blood donation icon */}
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-800">{donor.name}</h2>
        <p className="text-gray-700">
          <strong>Blood Group:</strong> {donor.bloodGroup}
        </p>
        <p className="text-gray-700">
          <strong>Location:</strong> {donor.location}
        </p>
        <p className="text-gray-700">
          <strong>Phone:</strong> {donor.phone}
        </p>
        <p className="text-gray-700">
          <strong>Email:</strong> {donor.email}
        </p>
      </div>
    </div>
  );
};

export default DonorCard;