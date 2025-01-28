// import React from "react";

// const SignUp = () => {
//   return (
//     <div className="bg-gradient-to-r from-teal-50 via-teal-50 to-teal-100 min-h-screen flex items-center justify-center p-4">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full">
//         <h1 className="text-2xl font-bold text-center text-indigo-600 mb-4">
//           Sign Up
//         </h1>

//         <form>
//           {/* Name */}
//           <div className="mb-3">
//             <label className="block text-gray-700 font-medium mb-1">
//               Full Name
//             </label>
//             <input
//               type="text"
//               placeholder="Enter your full name"
//               className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
//             />
//           </div>

//           {/* Email */}
//           <div className="mb-3">
//             <label className="block text-gray-700 font-medium mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
//             />
//           </div>

//           {/* Password */}
//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
//             />
//           </div>

//           {/* Sign Up Button */}
//           <button className="w-full bg-[#00A9E0] text-white py-1.5 rounded-lg hover:bg-indigo-700 transition duration-200 text-sm">
//             Sign Up
//           </button>
//         </form>

//         <div className="my-3 flex items-center justify-center">
//           <span className="text-gray-600 text-sm">or</span>
//         </div>

//         <div className="flex items-center space-x-2 justify-center">
//           {/* "Log in with" Text */}
//           <span className="text-gray-700 font-medium text-sm">Log in with</span>

//           {/* Google Logo */}
//           <a
//             href="#"
//             className="flex items-center justify-center"
//             aria-label="Log in with Google"
//           >
//             <img
//               src="https://imgs.search.brave.com/aML63go3qx4B2AZEeBGsMDESVu76lSffF1mIpwch2vs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzg4LzA3Lzg0/LzM2MF9GXzM4ODA3/ODQ1NF9tS3RiZFhZ/RjljeVFvdkNDVHNq/cUkwZ2JmdTdnQ2NT/cC5qcGc"
//               alt="Google Logo"
//               className="w-5 h-5 hover:opacity-80 transition-opacity duration-200"
//             />
//           </a>
//         </div>

//         <p className="text-center text-gray-600 mt-3 text-sm">
//           Already have an account?{" "}
//           <a href="/login" className="text-indigo-600 hover:text-indigo-700">
//             Login here
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUp;



import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    user_name: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    console.log("submitted form data : ",formData) ;
   
    try {
      const response = await fetch("http://localhost:9191/api/v1/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Something went wrong. Please try again.");
      }

      const result = await response.json();
      setSuccess("Sign up successful!");

      Navigate("/login") ;
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-gradient-to-r from-teal-50 via-teal-50 to-teal-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full">
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-4">
          Sign Up
        </h1>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-3">{success}</p>}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label className="block text-gray-700 font-medium mb-1">
              user_name
            </label>
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>

          {/* Sign Up Button */}
        
            <button
              type="submit"
              className="w-full bg-[#00A9E0] text-white py-1.5 rounded-lg hover:bg-indigo-700 transition duration-200 text-sm"
            >
              Sign Up
            </button>          
         
        </form>

        <div className="my-3 flex items-center justify-center">
          <span className="text-gray-600 text-sm">or</span>
        </div>

        <div className="flex items-center space-x-2 justify-center">
          <span className="text-gray-700 font-medium text-sm">Log in with</span>
          <a
            href="#"
            className="flex items-center justify-center"
            aria-label="Log in with Google"
          >
            <img
              src="https://imgs.search.brave.com/aML63go3qx4B2AZEeBGsMDESVu76lSffF1mIpwch2vs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzg4LzA3Lzg0/LzM2MF9GXzM4ODA3/ODQ1NF9tS3RiZFhZ/RjljeVFvdkNDVHNq/cUkwZ2JmdTdnQ2NT/cC5qcGc"
              alt="Google Logo"
              className="w-5 h-5 hover:opacity-80 transition-opacity duration-200"
            />
          </a>
        </div>

        <p className="text-center text-gray-600 mt-3 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:text-indigo-700">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
