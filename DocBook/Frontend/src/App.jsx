// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import AppointmentBookingCart from "./Components/AppointmentBookingCart";
import Home from "./Pages/Home";
import Doctors from "./Pages/Doctors";
import ApplyDoctorForm from "./Pages/ApplyDoctorForm";
import ApplyAppointmentForm from "./Pages/ApplyAppointmentForm";
import YourAppointments from "./Pages/YourAppointments";
import ContactUs from "./Pages/ContactUs";
import SignUp from "./Pages/SignUp";
import SignUpDoctor from "./Pages/SignUpDoctor";

import UserProfile from "./Pages/UserProfile";
import DoctorProfile from "./Pages/DoctorProfile";

import Store from "./Pages/Store";
import Login from './Pages/Login';
import DiseaseChecker from "./Pages/DiseaseChecker";
import AllDoctors from "./Pages/AllDoctors";
import AllDAppointment from "./Pages/AllDAppintment";
import DAppointmentHistory from "./Pages/DAppointmentHistory";
import HospitalStats from "./Pages/HospitalStats";
import Message from "./Pages/Message";
import ShowPatients from "./Pages/ShowPatients";
import DoctorMessage from "./Pages/DoctorMessage";

import MedicineForm from "./Pages/MedicineForm";
import Farmacy from "./Pages/Farmacy";

import BloodBank from "./Pages/BloodBank";

import Cart from "./Pages/Cart";
import UrgentBloodBank from "./Pages/UrgentBloodBank";
import Notifications from './Components/Notifications';
import PrescriptionPage from "./Pages/PrescriptionPage";


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/alldoctors" element={<AllDoctors />} />
            <Route path="/alldappointment" element={<AllDAppointment />} />
            <Route path="/apply" element={<ApplyDoctorForm />} />
            <Route path="/applyappointment" element={<ApplyAppointmentForm />} />
            <Route path="/dappointmenthistory" element={<DAppointmentHistory/>} />

            <Route path="/appointments" element={<YourAppointments />} />
            <Route path="/contact" element={<ContactUs />} />

            <Route path="/hospitalstats" element={<HospitalStats />} />

            <Route path="/cart" element={<Cart />} />

            <Route path="/signup" element={<SignUp />} />
            <Route path="/Farmacy" element={<Farmacy />} />
            <Route path="/signupDoctor" element={<SignUpDoctor />} />

            <Route path="/profile" element={<UserProfile />} />
            <Route path="/doctorProfile" element={<DoctorProfile />} />
            <Route path="/message" element={<Message/>} />
            <Route path="/doctormessage" element={<DoctorMessage/>} />
            
            <Route path="/showpatients" element={<ShowPatients/>} />
            <Route path ="/prescriptionpage" element={<PrescriptionPage/>} />
            

            <Route path="/store" element={<Store />} />
            <Route path="/MedicineForm" element={<MedicineForm />} />
           
            <Route path="/login" element={<Login />} />
            <Route path="/disease-checker" element={<DiseaseChecker />} />


            <Route path="/bloodbank" element={<BloodBank />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/urgentbloodbank" element={<UrgentBloodBank />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;