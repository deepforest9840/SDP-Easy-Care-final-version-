// import React, { useState, useEffect } from 'react';
// import DonorCard from '../Components/DonorCard';

// const UrgentBloodBank = () => {
//   const [donors, setDonors] = useState([]);
//   const [searchBloodGroup, setSearchBloodGroup] = useState('');
//   const [searchLocation, setSearchLocation] = useState('');
//   const [showForm, setShowForm] = useState(false);
//   const [newDonor, setNewDonor] = useState({
//     name: '',
//     bloodGroup: '',
//     location: '',
//     phone: '',
//     email: '',
//     requiredDate: '',
//     requiredTime: '',
//     quantity: 0,
//   });
//   const [editDonor, setEditDonor] = useState(null);
//   const [userEmail, setUserEmail] = useState('');
//   const [userStatus, setUserStatus] = useState('');
//   const [showUserDonorInfo, setShowUserDonorInfo] = useState(false);

//   const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

//   // Fetch user email and status from localStorage
//   useEffect(() => {
//     const email = localStorage.getItem('userEmail');
//     const status = localStorage.getItem('status');
    
//     setUserEmail(email);
//     setUserStatus(status);
//     if (email) {
//       setNewDonor((prevDonor) => ({
//         ...prevDonor,
//         email: email,
//       }));
//     }fetchDonors();
//   }, []);
//   const fetchDonors = async () => {
//     try {
//       const response = await fetch('http://localhost:9191/api/urgentdonors');
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       setDonors(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error('Error fetching donors:', error);
//       setDonors([]);
//     }
//   };
//   // Show user's donor information
//   const handleShowUserDonorInfo = () => {
//     const userDonor = donors.find((donor) => donor.email === userEmail);
//     if (userDonor) {
//       setNewDonor(userDonor);
//       setShowUserDonorInfo(true);
//     } else {
//       alert('No donor information found for your email.');
//     }
//   };



//   // const handleShowUserDonorInfo = () => {
//   //   console.log('Looking for donor with email:', userEmail);
//   //   const userDonor = donors.find((donor) => donor.email === userEmail);
//   //   console.log('Found donor:', userDonor);
//   //   if (userDonor) {
//   //     setNewDonor(userDonor);
//   //     setShowUserDonorInfo(true);
//   //   } else {
//   //     alert('No donor information found for your email.');
//   //   }
//   // };
  

//   const handleCancelShowUserDonorInfo = () => {
//     setShowUserDonorInfo(false);
//   };

//   const handleSaveUserDonorInfo = async () => {
//     try {
//       const response = await fetch(`http://localhost:9191/api/urgentdonors/${newDonor.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newDonor),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update donor');
//       }

//       const updatedDonor = await response.json();
//       setDonors(donors.map((donor) => (donor.id === updatedDonor.id ? updatedDonor : donor)));

//       setShowUserDonorInfo(false);
//     } catch (error) {
//       console.error('Error saving updated donor info:', error);
//     }
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const url = editDonor
//         ? `http://localhost:9191/api/urgentdonors/${editDonor.id}`
//         : `http://localhost:9191/api/urgentdonors?email=${encodeURIComponent(userEmail)}`;
//       const method = editDonor ? 'PUT' : 'POST';

//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newDonor),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('Error:', errorText);
//         throw new Error('Network response was not ok');
//       }

//       const savedDonor = await response.json();

//       // Update the donors state correctly after adding a new donor or editing one
//       if (editDonor) {
//         setDonors(donors.map((donor) => (donor.id === editDonor.id ? savedDonor : donor)));
//       } else {
//         setDonors((prevDonors) => [...prevDonors, savedDonor]);
//       }

//       // After saving the donor, ensure the donor is set to the user's information
//       setNewDonor(savedDonor); // This ensures that the donor data is updated for the "Show My Donor Info" section.

//       setShowForm(false);
//       setEditDonor(null);
//     } catch (error) {
//       console.error('Error saving donor:', error);
//     }
//   };

//   const handleDeleteUserDonorInfo = async () => {
//     try {
//       const response = await fetch(`http://localhost:9191/api/urgentdonors/${newDonor.id}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete donor');
//       }

//       setDonors(donors.filter((donor) => donor.id !== newDonor.id));
//       setShowUserDonorInfo(false);
//     } catch (error) {
//       console.error('Error deleting donor:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">Blood Bank</h1>
//       <div className="mb-4 flex items-center">
//         <button onClick={() => setShowForm(!showForm)} className="bg-green-500 text-white p-2 rounded mr-2">
//           {showForm ? 'Cancel' : 'Post for Urgent Blood'}
//         </button>
//         <button onClick={handleShowUserDonorInfo} className="bg-purple-500 text-white p-2 rounded mr-2">
//           Show My Info
//         </button>
//       </div>

//       {showUserDonorInfo && (
//         <div className="mb-4 p-4 border rounded">
//           <form>
//             <div className="mb-2">
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={newDonor.name}
//                 onChange={(e) => setNewDonor({ ...newDonor, name: e.target.value })}
//                 className="border p-2 rounded w-full"
//                 readOnly
//               />
//             </div>
//             {/* <div className="mb-2">
//               <select
//                 value={newDonor.bloodGroup}
//                 onChange={(e) => setNewDonor({ ...newDonor, bloodGroup: e.target.value })}
//                 className="border p-2 rounded w-full"
//               >
//                 <option value="" disabled>Select Blood Group</option>
//                 {bloodGroups.map((group) => (
//                   <option key={group} value={group}>{group}</option>
//                 ))}
                
//               </select>
              
//             </div> */}

//             <div className="mb-2">
//               <select
//                 value={newDonor.bloodGroup}
//                 disabled
//                 className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed"
//               >
//                 <option value="" disabled>Select Blood Group</option>
//                 {bloodGroups.map((group) => (
//                   <option key={group} value={group}>{group}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="mb-2">
//               <input
//                 type="text"
//                 placeholder="Location"
//                 value={newDonor.location}
//                 onChange={(e) => setNewDonor({ ...newDonor, location: e.target.value })}
//                 className="border p-2 rounded w-full"
//                 readOnly
//               />
//             </div>
//             <div className="mb-2">
//               <input
//                 type="text"
//                 placeholder="Phone"
//                 value={newDonor.phone}
//                 onChange={(e) => setNewDonor({ ...newDonor, phone: e.target.value })}
//                 className="border p-2 rounded w-full"
//                 readOnly
//               />
//             </div>
//             <div className="mb-2">
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={newDonor.email}
//                 onChange={(e) => setNewDonor({ ...newDonor, email: e.target.value })}
//                 className="border p-2 rounded w-full"
//                 readOnly
//               />
//             </div>
//             <div className="mb-2">
//               <input
//                 type="date"
//                 placeholder="Required Date"
//                 value={newDonor.requiredDate}
//                 onChange={(e) => setNewDonor({ ...newDonor, requiredDate: e.target.value })}
//                 className="border p-2 rounded w-full"
//                 readOnly
//               />
//             </div>
//             <div className="mb-2">
//               <input
//                 type="time"
//                 placeholder="Required Time"
//                 value={newDonor.requiredTime}
//                 onChange={(e) => setNewDonor({ ...newDonor, requiredTime: e.target.value })}
//                 className="border p-2 rounded w-full"
//                 readOnly
//               />
//             </div>
//             <div className="mb-2">
//               <input
//                 type="number"
//                 placeholder="Quantity"
//                 value={newDonor.quantity}
//                 onChange={(e) => setNewDonor({ ...newDonor, quantity: parseInt(e.target.value) })}
//                 className="border p-2 rounded w-full"
//                 readOnly
//               />
//             </div>
//             <div className="flex space-x-2">
//               <button
//                 type="button"
//                 onClick={handleCancelShowUserDonorInfo}
//                 className="bg-red-500 text-white p-2 rounded"
//               >
//                 Cancel
//               </button>
//               {/* <button
//                 type="button"
//                 onClick={handleSaveUserDonorInfo}
//                 className="bg-blue-500 text-white p-2 rounded"
//               >
//                 Save
//               </button> */}
//               <button
//                 type="button"
//                 onClick={handleDeleteUserDonorInfo}
//                 className="bg-red-500 text-white p-2 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {showForm && !showUserDonorInfo && (
//         <form onSubmit={handleFormSubmit} className="mb-4 p-4 border rounded">
//           <div className="mb-2">
//             <input
//               type="text"
//               placeholder="Name"
//               value={newDonor.name}
//               onChange={(e) => setNewDonor({ ...newDonor, name: e.target.value })}
//               className="border p-2 rounded w-full"
//             />
//           </div>
//           <div className="mb-2">
//             <select
//               value={newDonor.bloodGroup}
//               onChange={(e) => setNewDonor({ ...newDonor, bloodGroup: e.target.value })}
//               className="border p-2 rounded w-full"
//             >
//               <option value="" disabled>Select Blood Group</option>
//               {bloodGroups.map((group) => (
//                 <option key={group} value={group}>{group}</option>
//               ))}
//             </select>
//           </div>
//           <div className="mb-2">
//             <input
//               type="text"
//               placeholder="Location"
//               value={newDonor.location}
//               onChange={(e) => setNewDonor({ ...newDonor, location: e.target.value })}
//               className="border p-2 rounded w-full"
//             />
//           </div>
//           <div className="mb-2">
//             <input
//               type="text"
//               placeholder="Phone"
//               value={newDonor.phone}
//               onChange={(e) => setNewDonor({ ...newDonor, phone: e.target.value })}
//               className="border p-2 rounded w-full"
//             />
//           </div>
//           <div className="mb-2">
//             <input
//               type="email"
//               placeholder="Email"
//               value={newDonor.email}
//               onChange={(e) => setNewDonor({ ...newDonor, email: e.target.value })}
//               className="border p-2 rounded w-full"
//             />
//           </div>
//           <div className="mb-2">
//             <input
//               type="date"
//               placeholder="Required Date"
//               value={newDonor.requiredDate}
//               onChange={(e) => setNewDonor({ ...newDonor, requiredDate: e.target.value })}
//               className="border p-2 rounded w-full"
//             />
//           </div>
//           <div className="mb-2">
//             <input
//               type="time"
//               placeholder="Required Time"
//               value={newDonor.requiredTime}
//               onChange={(e) => setNewDonor({ ...newDonor, requiredTime: e.target.value })}
//               className="border p-2 rounded w-full"
//             />
//           </div>
//           <div className="mb-2">
//             <input
//               type="number"
//               placeholder="Quantity"
//               value={newDonor.quantity}
//               onChange={(e) => setNewDonor({ ...newDonor, quantity: parseInt(e.target.value) })}
//               className="border p-2 rounded w-full"
//             />
//           </div>
//           <div className="flex space-x-2">
//             <button
//               type="button"
//               onClick={() => setShowForm(false)}
//               className="bg-red-500 text-white p-2 rounded"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-500 text-white p-2 rounded"
//             >
//               Post
//             </button>
//           </div>
//         </form>
//       )}

//       {/* <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search Blood Group"
//           value={searchBloodGroup}
//           onChange={(e) => setSearchBloodGroup(e.target.value)}
//           className="border p-2 rounded w-full"
//         />
//       </div>

//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search Location"
//           value={searchLocation}
//           onChange={(e) => setSearchLocation(e.target.value)}
//           className="border p-2 rounded w-full"
//         />
//       </div> */}

//       {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {donors
//           .filter(
//             (donor) =>
//               donor.bloodGroup.includes(searchBloodGroup) &&
//               donor.location.includes(searchLocation)
//           )
//           .map((donor) => (
//             <DonorCard key={donor.id} donor={donor} />
//           ))}
//       </div> */}
//     </div>
//   );
// };

// export default UrgentBloodBank;
import React, { useState, useEffect } from 'react';
import DonorCard from '../Components/DonorCard';

const UrgentBloodBank = () => {
  const [donors, setDonors] = useState([]);
  const [searchBloodGroup, setSearchBloodGroup] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [newDonor, setNewDonor] = useState({
    name: '',
    bloodGroup: '',
    location: '',
    phone: '',
    email: '',
    requiredDate: '',
    requiredTime: '',
    quantity: 0,
  });
  const [editDonor, setEditDonor] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [showUserDonorInfo, setShowUserDonorInfo] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  // Fetch user email and status from localStorage
  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    const status = localStorage.getItem('status');
    
    setUserEmail(email);
    setUserStatus(status);
    if (email) {
      setNewDonor((prevDonor) => ({
        ...prevDonor,
        email: email,
      }));
    }
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const response = await fetch('http://localhost:9191/api/urgentdonors');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDonors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching donors:', error);
      setDonors([]);
    }
  };

  const handleShowUserDonorInfo = () => {
    const userDonor = donors.find((donor) => donor.email === userEmail);
    if (userDonor) {
      setNewDonor(userDonor);
      setShowUserDonorInfo(true);
    } else {
      alert('No information found');
    }
  };

  const handleCancelShowUserDonorInfo = () => {
    setShowUserDonorInfo(false);
    setNewDonor({
      name: '',
      bloodGroup: '',
      location: '',
      phone: '',
      email: '',
      requiredDate: '',
      requiredTime: '',
      quantity: 0,
    });
  };

  const handleSaveUserDonorInfo = async () => {
    try {
      const response = await fetch(`http://localhost:9191/api/urgentdonors/${newDonor.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDonor),
      });

      if (!response.ok) {
        throw new Error('Failed to update donor');
      }

      const updatedDonor = await response.json();
      setDonors(donors.map((donor) => (donor.id === updatedDonor.id ? updatedDonor : donor)));
      setShowUserDonorInfo(false);
    } catch (error) {
      console.error('Error saving updated donor info:', error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editDonor
        ? `http://localhost:9191/api/urgentdonors/${editDonor.id}`
        : `http://localhost:9191/api/urgentdonors?email=${encodeURIComponent(userEmail)}`;
      const method = editDonor ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDonor),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error:', errorText);
        throw new Error('Network response was not ok');
      }

      const savedDonor = await response.json();

      // Update the donors state correctly after adding a new donor or editing one
      if (editDonor) {
        setDonors(donors.map((donor) => (donor.id === editDonor.id ? savedDonor : donor)));
      } else {
        setDonors((prevDonors) => [...prevDonors, savedDonor]);
      }

      // After saving the donor, ensure the donor is set to the user's information
      setNewDonor(savedDonor); // This ensures that the donor data is updated for the "Show My Donor Info" section.

      setEditDonor(null);
    } catch (error) {
      console.error('Error saving donor:', error);
    }
  };

  const handleDeleteUserDonorInfo = async () => {
    try {
      const response = await fetch(`http://localhost:9191/api/urgentdonors/${newDonor.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete donor');
      }

      setDonors(donors.filter((donor) => donor.id !== newDonor.id));
      setShowUserDonorInfo(false);
    } catch (error) {
      console.error('Error deleting donor:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Button to show donor info */}
      <div className="mb-4 flex justify-end items-center">
        <button
          onClick={handleShowUserDonorInfo}
          className="bg-indigo-500 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-600 transition"
        >
          Show My Info
        </button>
      </div>
  
      {/* Modal for Donor Info */}
      {showUserDonorInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Donor Information</h2>
            {[
              { label: "Name", value: newDonor.name },
              { label: "Blood Group", value: newDonor.bloodGroup },
              { label: "Location", value: newDonor.location },
              { label: "Phone", value: newDonor.phone },
              { label: "Email", value: newDonor.email },
              { label: "Required Date", value: newDonor.requiredDate },
              { label: "Required Time", value: newDonor.requiredTime },
              { label: "Quantity", value: newDonor.quantity },
            ].map((field, index) => (
              <div key={index} className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">{field.label}</label>
                <input
                  type="text"
                  value={field.value}
                  readOnly
                  className="w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-800"
                />
              </div>
            ))}
            <div className="mt-4 flex justify-between">
              <button
                type="button"
                onClick={handleCancelShowUserDonorInfo}
                className="py-2 px-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleDeleteUserDonorInfo}
                className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
  
      {/* Blood Request Form */}
      <form
        onSubmit={handleFormSubmit}
        className="bg-white shadow-lg rounded-lg p-6 space-y-6 max-w-lg mx-auto border border-gray-200"
      >
        <h2 className="text-xl font-bold text-gray-800 text-center">Post Blood Request</h2>
        {[
          { label: "Name", type: "text", value: newDonor.name, onChange: (value) => setNewDonor({ ...newDonor, name: value }) },
          {
            label: "Blood Group",
            type: "select",
            value: newDonor.bloodGroup,
            onChange: (value) => setNewDonor({ ...newDonor, bloodGroup: value }),
            options: bloodGroups,
          },
          { label: "Location", type: "text", value: newDonor.location, onChange: (value) => setNewDonor({ ...newDonor, location: value }) },
          { label: "Phone", type: "text", value: newDonor.phone, onChange: (value) => setNewDonor({ ...newDonor, phone: value }) },
          { label: "Email", type: "email", value: newDonor.email, onChange: (value) => setNewDonor({ ...newDonor, email: value }) },
          { label: "Required Date", type: "date", value: newDonor.requiredDate, onChange: (value) => setNewDonor({ ...newDonor, requiredDate: value }) },
          { label: "Required Time", type: "time", value: newDonor.requiredTime, onChange: (value) => setNewDonor({ ...newDonor, requiredTime: value }) },
          { label: "Quantity (in bags)", type: "number", value: newDonor.quantity, onChange: (value) => setNewDonor({ ...newDonor, quantity: parseInt(value) }) },
        ].map((field, index) => (
          <div key={index} className="space-y-1">
            <label className="block text-sm font-medium text-gray-600">{field.label}</label>
            {field.type === "select" ? (
              <select
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-400"
                disabled={showUserDonorInfo}
              >
                <option value="" disabled>
                  Select {field.label}
                </option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-400"
                disabled={showUserDonorInfo}
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400 transition"
          disabled={showUserDonorInfo}
        >
          {editDonor ? "Update" : "Post"}
        </button>
      </form>
    </div>
  );
};  

export default UrgentBloodBank;