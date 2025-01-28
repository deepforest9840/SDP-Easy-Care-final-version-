import React from "react";
import heroImg01 from "../assets/images/hero-img01.png";
import heroImg02 from "../assets/images/hero-img02.png";
import heroImg03 from "../assets/images/hero-img03.png";
import icon01 from "../assets/images/icon01.png";
import icon02 from "../assets/images/icon02.png";
import icon03 from "../assets/images/icon03.png";
import videoIcon from "../assets/images/video-icon.png";
import avatarIcon from "../assets/images/avatar-icon.png";
import featureImg from "../assets/images/feature-img.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import About from "./DiseaseChecker";
import ServicesList from "./ServicesList";
import AllDoctors from "./AllDoctors";
import Doctors from "./Doctors";

const Home = () => {
  return (
    <>
      {/* Hero section with gradient background */}
      <section className="hero__section pt-8 pb-20 bg-gradient-to-r from-teal-50 via-teal-50 to-teal-100 text-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center justify-between">
            {/* Disease Checker Advertisement Banner (Below Navbar) */}
            <section className="advertisement-banner bg-gradient-to-r from-teal-700 to-teal-900 text-white py-8 px-4 rounded-lg shadow-lg w-full lg:w-[80%] mx-auto">
              <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl lg:text-4xl font-extrabold mb-4 leading-tight">
                  Not Feeling Well?{" "}
                  <span className="text-yellow-400">
                    Check Your Symptoms Now
                  </span>
                </h2>
                <p className="text-xl lg:text-2xl mb-4 opacity-90">
                  Instantly get reliable predictions about your health based on
                  your symptoms, backed by AI.
                </p>

                <div className="flex justify-center space-x-6">
                  <Link to="/disease-checker">
                    <button className="bg-[#FF5733] text-white py-4 px-8 rounded-lg shadow-lg text-xl font-bold hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-110">
                      Start the Disease Checker
                    </button>
                  </Link>
                </div>
              </div>
            </section>

            {/* Hero Content (Left Side) */}
            <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6 lg:space-y-8">
              {/* Image Banner */}
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://img.freepik.com/free-vector/online-doctor-concept_23-2148546392.jpg?t=st=1736258303~exp=1736261903~hmac=de4335c76d874a8d10cf3c6f6628a9e83170e7de49886ea0a5aa4800d6d52f0e&w=740" // Replace with the actual image URL
                  alt="Hero Image"
                  className="w-full h-[300px] object-cover rounded-lg"
                />
              </div>

              {/* Text Below the Image */}
              <div className="text-center lg:text-left space-y-6">
                <h1 className="text-[26px] leading-[36px] font-light text-black md:text-[36px] md:leading-[44px]">
                  We help patients live a healthy, longer life.
                </h1>
                <Link to="/doctors">
                  <button className="bg-red-600 text-white py-3 px-8 mt-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
                    Request an Appointment
                  </button>
                </Link>
              </div>
            </div>

            {/* Hero Counter Section */}
            <div className="mt-12 lg:mt-0 text-center lg:text-left space-y-8">
              <div className="flex items-center justify-center lg:justify-start space-x-6">
                <div className="text-4xl font-medium text-red-600">10+</div>
                <div className="text-lg text-gray-600">Years of Experience</div>
              </div>

              <div className="flex items-center justify-center lg:justify-start space-x-6">
                <div className="text-4xl font-medium text-red-600">15+</div>
                <div className="text-lg text-gray-600">Clinic Locations</div>
              </div>

              <div className="flex items-center justify-center lg:justify-start space-x-6">
                <div className="text-4xl font-medium text-red-600">100%</div>
                <div className="text-lg text-gray-600">
                  Patient Satisfaction
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>





      <h2 className="bg-gradient-to-r from-teal-50 via-teal-50 to-teal-100 text-3xl font-bold text-center">
            Meet Our Doctors
          </h2>

          
          <AllDoctors />



 {/* All Doctors Section */}
       {/* <section className="doctors-section py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Meet Our Doctors
          </h2>
          <AllDoctors />
        </div>
      </section> */}

























        {/* Sign-Up Buttons */}
        {/* <div className="mt-12 flex justify-center lg:justify-start space-x-6">
            <Link to="/signupDoctor">
              <button className="bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105">
                Sign Up as a Doctor
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
                Sign Up as a User
              </button>
            </Link>
        </div>
        <div className="mt-12 flex justify-center lg:justify-start space-x-6">
            <Link to="/login">
              <button className="bg-red-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105">
                Login
              </button>
            </Link>
        </div> */}

      {/* Providing the best medical services with a different background */}
      <section className="bg-gradient-to-r from-teal-50 via-teal-50 to-teal-100 py-16">
        <div className="container">
          <div className="lg:w-[470px] mx-auto text-center">
            <h2 className="text-3xl font-semibold text-headingColor mb-4">
              Providing the best medical services
            </h2>
            <p className="text-[16px] text-textColor">
              World-Class care for everyone. Our health system offers unmatched,
              expert health care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
            <div className="py-[30px] px-5 text-center bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
              <div>
                <img
                  src={icon01}
                  alt="Find a Doctor"
                  className="mx-auto mb-4"
                />
              </div>
              <h2 className="text-[26px] font-semibold text-headingColor mt-[30px]">
                Find a Doctor
              </h2>
              <p className="text-[16px] text-textColor font-[400] mt-4">
                World-Class care for everyone. Our health system offers
                unmatched, expert health care. From the lab to clinic.
              </p>
            </div>

            <div className="py-[30px] px-5 text-center bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
              <div>
                <img
                  src={icon02}
                  alt="Find a Location"
                  className="mx-auto mb-4"
                />
              </div>
              <h2 className="text-[26px] font-semibold text-headingColor mt-[30px]">
                Find a Location
              </h2>
              <p className="text-[16px] text-textColor font-[400] mt-4">
                World-Class care for everyone. Our health system offers
                unmatched, expert health care. From the lab to clinic.
              </p>
            </div>

            <div className="py-[30px] px-5 text-center bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
              <div>
                <img
                  src={icon03}
                  alt="Book Appointment"
                  className="mx-auto mb-4"
                />
              </div>
              <h2 className="text-[26px] font-semibold text-headingColor mt-[30px]">
                Book Appointment
              </h2>
              <p className="text-[16px] text-textColor font-[400] mt-4">
                World-Class care for everyone. Our health system offers
                unmatched, expert health care. From the lab to clinic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Services Section with a wave background */}
      <section className="bg-gradient-to-r from-teal-50 via-teal-50 to-teal-100 py-16 text-headingColor">
        <div className="container">
          <div className="xl:w-[470px] mx-auto text-center">
            <h2 className="text-3xl font-semibold">Our Medical Services</h2>
            <p className="text-[16px] text-gray-600 mt-4">
              World-Class services that cater to every need, from routine
              checkups to specialized treatments.
            </p>
          </div>
          <ServicesList />
        </div>
      </section>
    </>
  );
};

export default Home;