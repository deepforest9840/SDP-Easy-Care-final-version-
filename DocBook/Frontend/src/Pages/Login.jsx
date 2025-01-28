// import React, { useState } from "react";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log("Login form submitted: ", formData);

//     try {
//       const response = await fetch("http://localhost:9191/api/v1/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error("Invalid credentials. Please try again.");
//       }

//       const result = await response.json();
//       alert("Login api works successfully!");




//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="bg-gradient-to-r from-blue-50 via-blue-50 to-blue-100 min-h-screen flex items-center justify-center p-4">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full">
//         <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
//           Login
//         </h1>

//         {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

//         <form onSubmit={handleSubmit}>
//           {/* Email */}
//           <div className="mb-3">
//             <label className="block text-gray-700 font-medium mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//               className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//             />
//           </div>

//           {/* Password */}
//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter your password"
//               className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//             />
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-1.5 rounded-lg hover:bg-blue-700 transition duration-200 text-sm"
//           >
//             Login
//           </button>
//         </form>

//         <p className="text-center text-gray-600 mt-3 text-sm">
//           Don’t have an account?{" "}
//           <a href="/signup" className="text-blue-600 hover:text-blue-700">
//             Sign up here
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState(null);
//   const navigate = useNavigate(); // React Router's navigation hook

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log("Login form submitted: ", formData);

//     try {
//       // Login API
//       const loginResponse = await fetch("http://localhost:9191/api/v1/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!loginResponse.ok) {
//         throw new Error("Invalid credentials. Please try again.");
//       }

//       const loginResult = await loginResponse.json();
//       console.log("Login successful:", loginResult);

//       // Check Login Status API
//       const statusResponse = await fetch(`http://localhost:9191/api/v1/auth/loginStatus?email=${formData.email}`, {
//         method: "GET",
//       });

//       if (!statusResponse.ok) {
//         throw new Error("Failed to fetch login status.");
//       }

//       const status = await statusResponse.text();
//       console.log("Login status:", status);

//       // Redirect if status is "logedin"
//       if (status === "logedin") {
//         localStorage.setItem("userEmail", formData.email); // Save to localStorage
//         localStorage.setItem("status","logedin as a user");
//         // navigate("/profile"); // Navigate to userProfile.jsx
//         navigate("/profile", { state: { email: formData.email } }); // Pass email as state
//       } else {
//         alert("User is not logged in.");
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="bg-gradient-to-r from-blue-50 via-blue-50 to-blue-100 min-h-screen flex items-center justify-center p-4">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full">
//         <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
//           Login
//         </h1>

//         {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

//         <form onSubmit={handleSubmit}>
//           {/* Email */}
//           <div className="mb-3">
//             <label className="block text-gray-700 font-medium mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter your email"
//               className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//             />
//           </div>

//           {/* Password */}
//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter your password"
//               className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//             />
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-1.5 rounded-lg hover:bg-blue-700 transition duration-200 text-sm"
//           >
//             Login
//           </button>
//         </form>

//         <p className="text-center text-gray-600 mt-3 text-sm">
//           Don’t have an account?{" "}
//           <a href="/signup" className="text-blue-600 hover:text-blue-700">
//             Sign up here
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [role, setRole] = useState("user"); // Role: 'user' or 'doctor'
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Login form submitted: ", formData, "Role:", role);

    try {
      const apiBase = role === "user" ? "http://localhost:9191/api/v1/auth" : "http://localhost:9191/api/v1/DoctorAccount";

      // Login API
      const loginResponse = await fetch(`${apiBase}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!loginResponse.ok) {
        throw new Error("Invalid credentials. Please try again.");
      }

      const loginResult = await loginResponse.json();
      console.log("Login successful:", loginResult);

      // Check Login Status API
      const statusResponse = await fetch(`${apiBase}/loginStatus?email=${formData.email}`, {
        method: "GET",
      });

      if (!statusResponse.ok) {
        throw new Error("Failed to fetch login status.");
      }

      const status = await statusResponse.text();
      console.log("Login status:", status);

      // Redirect if status is "logedin"
      if (status === "logedin") {
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("status", "logedin");
        localStorage.setItem("role", role);
        if(role=== "user")
        {
          navigate("/profile", { state: { email: formData.email, role } });
        }
        else 
        {
          navigate("/doctorProfile", { state: { email: formData.email, role } });
        }
      } else {
        alert("User is not logged in.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 via-blue-50 to-blue-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Login
        </h1>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Role Selection */}
          <div className="mb-3">
            <label className="block text-gray-700 font-medium mb-1">Login as</label>
            <select
              value={role}
              onChange={handleRoleChange}
              className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="user">User</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-1.5 rounded-lg hover:bg-blue-700 transition duration-200 text-sm"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-3 text-sm">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:text-blue-700">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
