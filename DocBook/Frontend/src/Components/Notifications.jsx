// import React, { useState, useEffect } from 'react';

// const Notifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [userEmail, setUserEmail] = useState('');
//   const [userStatus, setUserStatus] = useState('');

//   // Fetch user email and status from localStorage
//   useEffect(() => {
//     const email = localStorage.getItem('userEmail');
//     const status = localStorage.getItem('status');
    
//     console.log('User Email:', email);
//     console.log('User Status:', status);

//     setUserEmail(email);
//     setUserStatus(status);

//     // Fetch notifications after user is set
//     if (email) {
//       fetchNotifications(email);
//     }
//   }, []);

//   // Function to fetch notifications
//   const fetchNotifications = async (email) => {
//     try {
//       const response = await fetch(`http://localhost:9191/api/notifications?email=${encodeURIComponent(email)}`);
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       setNotifications(data);
//     } catch (error) {
//       console.error('Error fetching notifications:', error);
//     }
//   };

//   if (!userEmail || !userStatus) {
//     return (
//       <div className="container mx-auto p-4">
//         <h1 className="text-3xl font-bold mb-4">Notifications</h1>
//         <p>You are not logged in. Please log in to view your notifications.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">Notifications</h1>
//       <div>
//         {notifications.length === 0 ? (
//           <p>No notifications available.</p>
//         ) : (
//           notifications.map((notification) => (
//             <div key={notification.id} className="mb-4 p-4 border rounded">
//               <p>{notification.message}</p>
//               {/* <p><strong>Timestamp:</strong> {new Date(notification.timestamp).toLocaleString()}</p> */}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Notifications;
import React, { useState, useEffect } from 'react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch user email and status from localStorage
  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    const status = localStorage.getItem('status');

    setUserEmail(email);
    setUserStatus(status);

    // Fetch notifications after user is set
    if (email) {
      fetchNotifications(email);
    } else {
      setLoading(false);
    }
  }, []);

  // Function to fetch notifications
  const fetchNotifications = async (email) => {
    try {
      const response = await fetch(
        `http://localhost:9191/api/notifications?email=${encodeURIComponent(email)}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
          <span className="text-lg font-semibold text-gray-700">Loading notifications...</span>
        </div>
      </div>
    );
  }

  if (!userEmail || !userStatus) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Notifications</h1>
        <p className="text-lg text-gray-600 mb-6">You are not logged in. Please log in to view your notifications.</p>
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition ease-in-out duration-300">
          Log In
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Notifications</h1>
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <p className="text-lg text-gray-600">No notifications available at the moment.</p>
          ) : (
            notifications.map((notification) => (
              <div key={notification.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                <p className="text-gray-900 font-medium">{notification.message}</p>
                {/* Uncomment below to display timestamp */}
                {/* <p className="text-sm text-gray-500 mt-1">{new Date(notification.timestamp).toLocaleString()}</p> */}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;