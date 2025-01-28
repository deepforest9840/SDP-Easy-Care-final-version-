// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import DonorCard from '../Components/DonorCard';

// const BloodBank = () => {
//   const navigate = useNavigate();
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
//   });
//   const [editDonor, setEditDonor] = useState(null);
//   const [userEmail, setUserEmail] = useState('');
//   const [userStatus, setUserStatus] = useState('');
//   const [showUserDonorInfo, setShowUserDonorInfo] = useState(false);

//   const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

//   useEffect(() => {
//     const email = localStorage.getItem('userEmail');
//     const status = localStorage.getItem('status');
    
//     console.log('User Email:', email);
//     console.log('User Status:', status);

//     setUserEmail(email);
//     setUserStatus(status);
//     if (email) {
//       setNewDonor((prevDonor) => ({
//         ...prevDonor,
//         email: email,
//       }));
//     }
//     fetchDonors();
//   }, []);

//   const fetchDonors = async () => {
//     try {
//       const response = await fetch('http://localhost:9191/api/donors');
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

//   const handleSearch = async () => {
//     try {
//       const encodedBloodGroup = encodeURIComponent(searchBloodGroup);
//       const encodedLocation = encodeURIComponent(searchLocation);
//       const response = await fetch(
//         `http://localhost:9191/api/donors/search?bloodGroup=${encodedBloodGroup}&location=${encodedLocation}`
//       );
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       setDonors(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error('Error searching donors:', error);
//     }
//   };

//   const handleShowUserDonorInfo = () => {
//     const userDonor = donors.find((donor) => donor.email === userEmail);
//     if (userDonor) {
//       setNewDonor(userDonor);
//       setShowUserDonorInfo(true);
//     } else {
//       alert('No donor information found for your email.');
//     }
//   };

//   const handleCancelShowUserDonorInfo = () => {
//     setShowUserDonorInfo(false);
//   };

//   const handleSaveUserDonorInfo = async () => {
//     try {
//       const response = await fetch(`http://localhost:9191/api/donors/${newDonor.id}`, {
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
//         ? `http://localhost:9191/api/donors/${editDonor.id}`
//         : `http://localhost:9191/api/donors?email=${encodeURIComponent(userEmail)}`;
//       const method = editDonor ? 'PUT' : 'POST';

//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newDonor),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const savedDonor = await response.json();
//       if (editDonor) {
//         setDonors(donors.map((donor) => (donor.id === editDonor.id ? savedDonor : donor)));
//       } else {
//         setDonors([...donors, savedDonor]);
//       }

//       setShowForm(false);
//       setNewDonor({
//         name: '',
//         bloodGroup: '',
//         location: '',
//         phone: '',
//         email: '',
//       });
//       setEditDonor(null);
//     } catch (error) {
//       console.error('Error saving donor:', error);
//     }
//   };

//   const handleEdit = (donor) => {
//     if (donor.email === userEmail) {
//       setNewDonor(donor);
//       setEditDonor(donor);
//       setShowForm(true);
//     } else {
//       alert('You can only edit your own donor information.');
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:9191/api/donors/${id}`, {
//         method: 'DELETE',
//       });
//       if (!response.ok) {
//         throw new Error('Failed to delete donor');
//       }
//       setDonors(donors.filter((donor) => donor.id !== id));
//     } catch (error) {
//       console.error('Error deleting donor:', error);
//     }
//   };

//   const handleDeleteUserDonorInfo = async (id) => {
//     if (!newDonor.id) {
//       console.error("Donor ID is missing");
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:9191/api/donors/${newDonor.id}`, {
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

//   const handleNotification = () => {
//     navigate('/notifications');
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Blood Bank</h1>
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex space-x-4">
//           <select
//             value={searchBloodGroup}
//             onChange={(e) => setSearchBloodGroup(e.target.value)}
//             className="border p-2 rounded"
//           >
//             <option value="">Select Blood Group</option>
//             {bloodGroups.map((group) => (
//               <option key={group} value={group}>
//                 {group}
//               </option>
//             ))}
//           </select>
//           <input
//             type="text"
//             placeholder="Search by Location"
//             value={searchLocation}
//             onChange={(e) => setSearchLocation(e.target.value)}
//             className="border p-2 rounded"
//           />
//           <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded">
//             Search
//           </button>
//           <button onClick={() => setShowForm(!showForm)} className="bg-green-500 text-white p-2 rounded">
//             {showForm ? 'Cancel' : 'Add Donor'}
//           </button>
//         </div>
//         <div className="flex space-x-4">
//           <button
//             onClick={handleShowUserDonorInfo}
//             className="bg-purple-500 text-white p-2 rounded"
//           >
//             Show My Info
//           </button>
//           <button
//             onClick={handleNotification}
//             className="bg-yellow-500 text-white p-2 rounded"
//           >
//             Notifications
//           </button>
//           <button
//             onClick={() => window.open('https://www.google.com/maps/search/Blood+Bank+Bangladesh', '_blank')}
//             className="bg-red-500 text-white p-2 rounded"
//           >
//             Blood Bank Locations
//           </button>
//           <button
//             onClick={() => navigate('/urgentbloodbank')}
//             className="bg-orange-500 text-white p-2 rounded"
//           >
//             Urgent Donor Needed
//           </button>
//         </div>
//       </div>

//       {showUserDonorInfo && (
//         <div className="mb-4 p-4 border rounded bg-gray-50">
//           <form>
//             <div className="mb-2">
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={newDonor.name}
//                 onChange={(e) => setNewDonor({ ...newDonor, name: e.target.value })}
//                 className="border p-2 rounded w-full"
//               />
//             </div>
//             <div className="mb-2">
//               <select
//                 value={newDonor.bloodGroup}
//                 onChange={(e) => setNewDonor({ ...newDonor, bloodGroup: e.target.value })}
//                 className="border p-2 rounded w-full"
//               >
//                 <option value="" disabled>Select Blood Group</option>
//                 <option value="A+">A+</option>
//                 <option value="A-">A-</option>
//                 <option value="B+">B+</option>
//                 <option value="B-">B-</option>
//                 <option value="O+">O+</option>
//                 <option value="O-">O-</option>
//                 <option value="AB+">AB+</option>
//                 <option value="AB-">AB-</option>
//               </select>
//             </div>
//             <div className="mb-2">
//               <input
//                 type="text"
//                 placeholder="Location"
//                 value={newDonor.location}
//                 onChange={(e) => setNewDonor({ ...newDonor, location: e.target.value })}
//                 className="border p-2 rounded w-full"
//               />
//             </div>
//             <div className="mb-2">
//               <input
//                 type="text"
//                 placeholder="Phone"
//                 value={newDonor.phone}
//                 onChange={(e) => setNewDonor({ ...newDonor, phone: e.target.value })}
//                 className="border p-2 rounded w-full"
//               />
//             </div>
//             <div className="mb-2">
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={newDonor.email}
//                 onChange={(e) => setNewDonor({ ...newDonor, email: e.target.value })}
//                 className="border p-2 rounded w-full"
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
//               <button
//                 type="button"
//                 onClick={handleSaveUserDonorInfo}
//                 className="bg-blue-500 text-white p-2 rounded"
//               >
//                 Save
//               </button>
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
//         <form onSubmit={handleFormSubmit} className="mb-4 p-4 border rounded bg-gray-50">
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
//               <option value="A+">A+</option>
//               <option value="A-">A-</option>
//               <option value="B+">B+</option>
//               <option value="B-">B-</option>
//               <option value="O+">O+</option>
//               <option value="O-">O-</option>
//               <option value="AB+">AB+</option>
//               <option value="AB-">AB-</option>
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
//               readOnly
//             />
//           </div>
//           <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
//             Save Donor
//           </button>
//         </form>
//       )}

//       <div>
//         {donors.map((donor) => (
//           <div key={donor.id} className="mb-4">
//             <DonorCard donor={donor} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BloodBank;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom'; // Import navigate
import DonorCard from '../Components/DonorCard';

const BloodBank = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [donors, setDonors] = useState([]);
  const [searchBloodGroup, setSearchBloodGroup] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newDonor, setNewDonor] = useState({
    name: '',
    bloodGroup: '',
    location: '',
    phone: '',
    email: '',
  });
  const [editDonor, setEditDonor] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [showUserDonorInfo, setShowUserDonorInfo] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']; // List of blood groups

  // Fetch user email and status from localStorage
  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    const status = localStorage.getItem('status');
    
    console.log('User Email:', email);
    console.log('User Status:', status);

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
      const response = await fetch('http://localhost:9191/api/donors');
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

  const handleSearch = async () => {
    try {
      const encodedBloodGroup = encodeURIComponent(searchBloodGroup);
      const encodedLocation = encodeURIComponent(searchLocation);
      const response = await fetch(
        `http://localhost:9191/api/donors/search?bloodGroup=${encodedBloodGroup}&location=${encodedLocation}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDonors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error searching donors:', error);
    }
  };

  // New Function to Show User's Donor Info
  const handleShowUserDonorInfo = () => {
    const userDonor = donors.find((donor) => donor.email === userEmail);
    if (userDonor) {
      setNewDonor(userDonor);
      setShowUserDonorInfo(true);
    } else {
      alert('No donor information found for your email.');
    }
  };

  // Cancel function for "Show My Donor Info"
  const handleCancelShowUserDonorInfo = () => {
    setShowUserDonorInfo(false);
  };

  // Save the updated donor information
  const handleSaveUserDonorInfo = async () => {
    try {
      const response = await fetch(`http://localhost:9191/api/donors/${newDonor.id}`, {
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

      setShowUserDonorInfo(false); // Close the form after saving
    } catch (error) {
      console.error('Error saving updated donor info:', error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editDonor
        ? `http://localhost:9191/api/donors/${editDonor.id}`
        : `http://localhost:9191/api/donors?email=${encodeURIComponent(userEmail)}`;
      const method = editDonor ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDonor),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const savedDonor = await response.json();
      if (editDonor) {
        setDonors(donors.map((donor) => (donor.id === editDonor.id ? savedDonor : donor)));
      } else {
        setDonors([...donors, savedDonor]);
      }

      setShowForm(false);
      setNewDonor({
        name: '',
        bloodGroup: '',
        location: '',
        phone: '',
        email: '',
      });
      setEditDonor(null);
    } catch (error) {
      console.error('Error saving donor:', error);
    }
  };

  const handleEdit = (donor) => {
    if (donor.email === userEmail) {
      setNewDonor(donor);
      setEditDonor(donor);
      setShowForm(true);
    } else {
      alert('You can only edit your own donor information.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:9191/api/donors/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete donor');
      }
      setDonors(donors.filter((donor) => donor.id !== id));
    } catch (error) {
      console.error('Error deleting donor:', error);
    }
  };


  const handleDeleteUserDonorInfo = async (id) => {
    if (!newDonor.id) {
      console.error("Donor ID is missing");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:9191/api/donors/${newDonor.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete donor');
      }
  
      // Remove the deleted donor from the list
      setDonors(donors.filter((donor) => donor.id !== newDonor.id));
  
      // Hide the form after deletion
      setShowUserDonorInfo(false);
    } catch (error) {
      console.error('Error deleting donor:', error);
    }
  };

  // New function to navigate to the notifications page
  const handleNotification = () => {
    navigate('/notifications');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Blood Bank</h1>
      <div className="mb-4 flex items-center">
      <div className="flex flex-wrap gap-3 items-center mb-4">
        {/* Blood Group Dropdown */}
        <select
          value={searchBloodGroup}
          onChange={(e) => setSearchBloodGroup(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          <option value="">Select Blood Group</option>
          {bloodGroups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>

        {/* Search by Location */}
        <input
          type="text"
          placeholder="Search by Location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium shadow hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 transition"
        >
          Search
        </button>

        {/* Toggle Add Donor Form */}
        <button
          onClick={() => setShowForm(!showForm)}
          className={`px-4 py-2 rounded-lg ${
            showForm ? 'bg-gray-400' : 'bg-green-500'
          } text-white font-medium shadow hover:opacity-90 focus:ring-2 focus:ring-green-400 transition`}
        >
          {showForm ? 'Cancel' : 'Add Donor'}
        </button>

        {/* Show My Info */}
        <button
          onClick={handleShowUserDonorInfo}
          className="px-4 py-2 rounded-lg bg-purple-500 text-white font-medium shadow hover:bg-purple-600 focus:ring-2 focus:ring-purple-400 transition"
        >
          Show My Info
        </button>

        {/* Notifications */}
        <button
          onClick={handleNotification}
          className="px-4 py-2 rounded-lg bg-yellow-500 text-white font-medium shadow hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400 transition"
        >
          Notifications
        </button>

        {/* Blood Bank Locations */}
        <button
          onClick={() => window.open('https://www.google.com/maps/search/Blood+Bank+Bangladesh', '_blank')}
          className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium shadow hover:bg-red-600 focus:ring-2 focus:ring-red-400 transition"
        >
          Blood Bank Locations
        </button>

        {/* Urgent Donor Needed */}
        <button
          onClick={() => navigate('/urgentbloodbank')}
          className="px-4 py-2 rounded-lg bg-orange-500 text-white font-medium shadow hover:bg-orange-600 focus:ring-2 focus:ring-orange-400 transition"
        >
          Urgent Donor Needed
        </button>
      </div>
      </div>

      {/* Show Donor Info Form */}
      {showUserDonorInfo && (
        <div className="mb-4 p-4 border rounded">
          <form>
            {/* Form fields for donor information */}
            <div className="mb-2">
              <input
                type="text"
                placeholder="Name"
                value={newDonor.name}
                onChange={(e) => setNewDonor({ ...newDonor, name: e.target.value })}
                className="border p-2 rounded w-full"
              />
            </div>
            {/* ... other form fields ... */}
            <div className="mb-2">
              <select
                value={newDonor.bloodGroup}
                onChange={(e) => setNewDonor({ ...newDonor, bloodGroup: e.target.value })}
                className="border p-2 rounded w-full"
              >
                <option value="" disabled>Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
            <div className="mb-2">
              <input
                type="text"
                placeholder="Location"
                value={newDonor.location}
                onChange={(e) => setNewDonor({ ...newDonor, location: e.target.value })}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                placeholder="Phone"
                value={newDonor.phone}
                onChange={(e) => setNewDonor({ ...newDonor, phone: e.target.value })}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="mb-2">
              <input
                type="email"
                placeholder="Email"
                value={newDonor.email}
                onChange={(e) => setNewDonor({ ...newDonor, email: e.target.value })}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={handleCancelShowUserDonorInfo}
                className="bg-red-500 text-white p-2 rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveUserDonorInfo}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleDeleteUserDonorInfo}
                className="bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Donor Form */}
      {showForm && !showUserDonorInfo && (
        <form onSubmit={handleFormSubmit} className="mb-4 p-4 border rounded">
          {/* Form fields for adding donor */}
          <div className="mb-2">
            <input
              type="text"
              placeholder="Name"
              value={newDonor.name}
              onChange={(e) => setNewDonor({ ...newDonor, name: e.target.value })}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="mb-2">
          <select
            value={newDonor.bloodGroup}
            onChange={(e) => setNewDonor({ ...newDonor, bloodGroup: e.target.value })}
            className="border p-2 rounded w-full"
          >
            <option value="" disabled>
              Select Blood Group
            </option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>
        <div className="mb-2">
          <input
            type="text"
            placeholder="Location"
            value={newDonor.location}
            onChange={(e) => setNewDonor({ ...newDonor, location: e.target.value })}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            placeholder="Phone"
            value={newDonor.phone}
            onChange={(e) => setNewDonor({ ...newDonor, phone: e.target.value })}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mb-2">
          <input
            type="email"
            placeholder="Email"
            value={newDonor.email}
            onChange={(e) => setNewDonor({ ...newDonor, email: e.target.value })}
            className="border p-2 rounded w-full"
            readOnly
          />
        </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            Save Donor
          </button>
        </form>
      )}

      <div>
        {donors.map((donor) => (
          <div key={donor.id} className="mb-4">
            <DonorCard donor={donor} />
          </div>
        ))}
      </div>

{/* 
      <div className="flex flex-wrap gap-4">
        {donors.map((donor) => (
          <div key={donor.id} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <DonorCard donor={donor} />
          </div>
        ))}
      </div> */}

    </div>
  );
};

export default BloodBank;