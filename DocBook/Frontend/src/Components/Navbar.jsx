import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CartIcon from "../assets/ccc.png"; // Importing the cart icon image

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown menu

  const UserEmail = localStorage.getItem("UserEmail");
  const role = localStorage.getItem("role");

  const [account, setAccount] = useState("profile");

  useEffect(() => {
    if (role === "doctor") {
      setAccount("doctor");
    } else if (role === "user") {
      setAccount("user");
    }
  }, [role]);

  return (
    <nav className="bg-teal-700 p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          DocBook
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-2xl lg:hidden focus:outline-none"
        >
          ☰
        </button>

        {/* Links */}
        <div
          className={`lg:flex lg:items-center lg:space-x-6 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <Link to="/" className="block mt-2 lg:mt-0 text-white hover:text-teal-100">
            Home
          </Link>

          {/* <Link to="/cart" className="block mt-2 lg:mt-0 text-white hover:text-teal-100 flex items-center">
            <img src={CartIcon} alt="Cart" className="w-5 h-5 mr-2" />
            Cart
          </Link> */}

          <Link to="/alldappointment" className="block mt-2 lg:mt-0 text-white hover:text-teal-100">
            Appointments
          </Link>

          <Link to="/hospitalstats" className="block mt-2 lg:mt-0 text-white hover:text-teal-100">
            Hospital Stats
          </Link>

          {/* <Link to="/medicineform" className="block mt-2 lg:mt-0 text-white hover:text-teal-100">
            Add Medicine
          </Link> */}

          <Link to="/farmacy" className="block mt-2 lg:mt-0 text-white hover:text-teal-100">
            Pharmacy
          </Link>

          <Link to="/bloodbank" className="block mt-2 lg:mt-0 text-white hover:text-teal-100">
            Blood Bank
          </Link>

          {/* <Link to="/urgentbloodbank" className="block mt-2 lg:mt-0 text-white hover:text-teal-100">
            Urgent Blood Bank
          </Link> */}
          <Link to="/cart" className="block mt-2 lg:mt-0 text-white hover:text-teal-100 flex items-center">
            <img src={CartIcon} alt="Cart" className="w-9 h-9 mr-2" />
            
          </Link>
          {/* Dropdown for Sign Up */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="block mt-2 lg:mt-0 text-white hover:text-teal-100"
            >
              Sign Up
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                <Link
                  to="/signup"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Sign Up as User
                </Link>
                <Link
                  to="/signupDoctor"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Sign Up as Doctor
                </Link>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Log In
                </Link>
              </div>
            )}
          </div>

          {/* Profile/Account Link */}
          <Link
            to={role === "doctor" ? "/doctorProfile" : "/profile"}
            className="block mt-2 lg:mt-0 text-cyan hover:text-teal-100"
          >
            {account}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
