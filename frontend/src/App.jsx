import React from "react";
import Herosection from './components/hero_section/hero';
import Features from "./components/features/features";
import Courses from "./components/courses/courses";
import Testimonials from "./components/testimonial/testimonial";
import Contact from "./components/contact/contact";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
import "bootstrap-icons/font/bootstrap-icons.css";
import OsintAndAI from "./components/osint/osint";
import Dashboard from "./components/dashboard/dashboard";
import Footer from "./components/footer/footer";
import Gpt from './components/gpt/gpt'
import { Route,Routes,Router } from "react-router-dom";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import { useUser } from "@clerk/clerk-react";

function App() {

  
  const {user } = useUser();


    const email =
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses?.[0]?.emailAddress ||
    "No email found";

  return (
    <Routes>
      <Route path="/" element={<><Navbar/> <Herosection/> <Footer/></>} /> 
      <Route path="/courses" element={<><Navbar/> <Courses/> <Footer/></>} /> 
      <Route path="/features" element={<><Navbar/> <Features/> <Footer/></>} /> 
      <Route path="/osinttool" element={<><Navbar/> <OsintAndAI userEmail={email}/> <Footer/></>} /> 
      <Route path="/testimonials" element={<><Navbar/> <Testimonials/> <Footer/></>} /> 
      <Route path="/contact" element={<><Navbar/> <Contact/> <Footer/></>} /> 
      <Route path="/gpt" element={<><Navbar/> <Gpt/> <Footer/></>} /> 
      <Route path="/dashboard" element={<><Navbar/> <Dashboard userEmail={email}/> <Footer/></>} /> 
      <Route path="/login" element={<LoginPage/>} /> 
      <Route path="/signup" element={<SignupPage/>} /> 
    </Routes>
  );
}
export default App;

