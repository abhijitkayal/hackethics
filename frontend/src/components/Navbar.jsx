import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const location=useLocation();
  const isActive = (path) => location.pathname === path;

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    document.body.setAttribute("data-bs-theme", newTheme);
    document.body.setAttribute("data-theme", newTheme);
    setDarkMode(!darkMode);
  };

  React.useEffect(() => {
    document.body.setAttribute("data-bs-theme", "dark");
    document.body.setAttribute("data-theme", "dark");
  }, []);

  return (
    



     <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark bg-opacity-30 backdrop-blur-md">
      

       <div className="container flex justify-between items-center py-1">
          <Link to="/" className="navbar-brand d-flex align-items-center text-white">
           <i className="bi bi-shield-lock-fill fs-4 me-2 text-white"></i>
           <div>
             <div className="fw-bold text-white">Hackethics138</div>
             <div className="small opacity-75 text-white">Cybersecurity · OSINT · AI</div>
           </div>
         </Link>

        <button
          className="lg:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        <ul
          className={`flex flex-col lg:flex-row lg:static top-full w-full text-white lg:w-auto transition-all duration-300 ${
            menuOpen ? "block " : "hidden lg:flex"
          }`}
        >

          
            <li>
            <Link to="/" className={`block rounded-md transition-all px-2 py-2 no-underline text-white duration-200 ${
                   isActive("/")
                     ? "text-white border-b-2 border-white"
                     : "hover:text-blue-400"
                 }`} onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/courses" className={`block rounded-md px-2 py-2 transition-all no-underline text-white duration-200 ${
                   isActive("/courses")
                     ? "text-white border-b-2 border-white"
                     : "hover:text-blue-400"
                 }`} onClick={() => {setMenuOpen(false); }}>
              Courses
            </Link>
          </li>
          <li>
            <Link to="/features" className={`block rounded-md px-2 py-2 transition-all no-underline text-white duration-200 ${
                   isActive("/features")
                     ? "text-white border-b-2 border-white"
                     : "hover:text-blue-400"
                 }`} onClick={() => {setMenuOpen(false); }}>
              Services
            </Link>
          </li>
          <li>
            <Link to="/osinttool" className={`block rounded-md px-2 py-2 transition-all no-underline duration-200 text-white ${
                   isActive("/osinttool")
                     ? "text-white border-b-2 border-white"
                     : "hover:text-blue-400"
                 }`} onClick={() => {setMenuOpen(false);}}>
              OSINT Tools
            </Link>
          </li>
          <li>
            <Link to="/gpt" className={`block rounded-md px-2 py-2 transition-all no-underline text-white duration-200 ${
                   isActive("/gpt")
                     ? "text-white border-b-2 border-white"
                     : "hover:text-blue-400"
                 }`} onClick={() => {setMenuOpen(false);}}>
              AI Agent
            </Link>
          </li>
          <li>
            <Link to="/contact" className={`block px-2 py-2 rounded-md transition-all no-underline text-white duration-200 ${
                   isActive("/contact")
                     ? "text-white border-b-2 border-white"
                     : "hover:text-blue-400"
                 }`} onClick={() => {setMenuOpen(false);}}>
              Contact
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className={`block px-2 rounded-md py-2 transition-all no-underline text-white duration-200 ${
                   isActive("/dashboard")
                     ? "text-white border-b-2 border-white"
                     : "hover:text-blue-400"
                 }`} onClick={() => {setMenuOpen(false); }}>
              Dashboard
            </Link>
          </li>
          
          {/* Auth */}
          <SignedOut>
            <Link to="/login" className={`block px-2 py-2 rounded-md transition-all no-underline text-white duration-200 ${
                   isActive("/login")
                     ? "text-white border-b-2 border-white"
                     : "hover:text-blue-400"
                 }`} onClick={() => setMenuOpen(false)}>
              Login/SignUp
            </Link>
            {/* <Link to="/signup" className="block nav-link px-2 py-2 text-white" onClick={() => setMenuOpen(false)}>
              Sign Up
            </Link> */}
            
          </SignedOut>
          <SignedIn>


            <li className="px-4 py-2">
              <UserButton afterSignOutUrl="/" />
            </li>
          </SignedIn>

          {/* <li className="nav-item ms-3 d-flex align-items-center">
                 <div className="form-check form-switch mb-0">
                   <input
                     className="form-check-input"
                     type="checkbox"
                     id="themeToggle"
                     aria-label="Toggle dark mode"
                     onClick={toggleTheme}
                   />
                   <label
                     className="form-check-label small"
                     htmlFor="themeToggle"
                     style={{ color: "#fff" }}
                   >
                     <i id="themeIcon" className="bi bi-sun"></i>
                   </label>
                 </div>
               </li> */}
          
              <li className="nav-item ms-3 d-flex align-items-center">
             <div className="form-check form-switch mb-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="themeToggle"
                  aria-label="Toggle dark mode"
                  onClick={toggleTheme}
                />
                <label
                  className="form-check-label small text-white"
                  htmlFor="themeToggle"
                >
                  <i id="themeIcon" className="bi bi-sun"></i>
                </label>
              </div>
            </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;





// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";

// const Navbar = () => {
//   const [darkMode, setDarkMode] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   const toggleTheme = () => {
//     document.body.setAttribute("data-bs-theme", darkMode ? "light" : "dark");
//     setDarkMode(!darkMode);
//   };

  
//   const { isSignedIn } = useUser();
//   const navigate = useNavigate();

//   const handleProtectedClick = (action) => {
//     if (!isSignedIn) {
//       console.log(isSignedIn);
//       // alert("Please login first to continue.");
      
//       return;
//     }
//     action(); 
//   };

//   const openFeature = () => {
//     navigate("/features");
//   };
//    const openCourses= () => {
//     navigate("/courses");
//   };
//     const opengpt= () => {
//     navigate("/gpt");
//   };
//     const openDashboard= () => {
//     navigate("/Dashboard");
//   };
//     const openTool= () => {
//     navigate("/osinttool");
//   };
//   const openContact=()=>{
//     navigate("/contact");
//   }


//   return (
//     <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
//       <div className="container flex justify-between items-center py-1">
//         <a href="#" className="flex items-center gap-2">
//           <i className="bi bi-shield-lock-fill fs-4 text-white"></i>
//           <div>
//             <div className="font-bold text-white">Hackethics138</div>
//             <div className="text-sm opacity-80 text-white">Cybersecurity · OSINT · AI</div>
//           </div>
//         </a>

//         <button
//           className="lg:hidden text-white text-2xl"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           {menuOpen ? "✖" : "☰"}
//         </button>

//         <ul
//           className={`flex flex-col lg:flex-row lg:static top-full w-full text-white lg:w-auto transition-all duration-300 ${
//             menuOpen ? "block " : "hidden lg:flex"
//           }`}
//         >

          
//             <li>
//             <Link to="/" className="block px-2 py-2 nav-link text-white " onClick={() => setMenuOpen(false)}>
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link to="/courses" className="block px-2 py-2 nav-link text-white" onClick={() => {setMenuOpen(false);  handleProtectedClick(openCourses)}}>
//               Courses
//             </Link>
//           </li>
//           <li>
//             <Link to="/features" className="block nav-link  px-2 py-2 text-white" onClick={() => {setMenuOpen(false);  handleProtectedClick(openFeature)}}>
//               Services
//             </Link>
//           </li>
//           <li>
//             <Link to="/osinttool" className="block nav-link px-2 py-2 text-white" onClick={() => {setMenuOpen(false);  handleProtectedClick(openTool)}}>
//               OSINT Tools
//             </Link>
//           </li>
//           <li>
//             <Link to="/gpt" className="block nav-link px-2 py-2 text-white" onClick={() => {setMenuOpen(false);  handleProtectedClick(opengpt)}}>
//               AI Agent
//             </Link>
//           </li>
//           <li>
//             <Link to="/contact" className="block nav-link px-2 py-2 text-white" onClick={() => {setMenuOpen(false);  handleProtectedClick(openContact)}}>
//               Contact
//             </Link>
//           </li>
//           <li>
//             <Link to="/dashboard" className="block px-2 py-2 nav-link text-white" onClick={() => {setMenuOpen(false);  handleProtectedClick(openDashboard)}}>
//               Dashboard
//             </Link>
//           </li>
          
//           {/* Auth */}
//           <SignedOut>
//             <Link to="/login" className="block nav-link px-2 py-2 text-white" onClick={() => setMenuOpen(false)}>
//               Login
//             </Link>
//             <Link to="/signup" className="block nav-link px-2 py-2 text-white" onClick={() => setMenuOpen(false)}>
//               Sign Up
//             </Link>
            
//           </SignedOut>
//           <SignedIn>


//             <li className="px-4 py-2">
//               <UserButton afterSignOutUrl="/" />
//             </li>
//           </SignedIn>

//           <li className="nav-item ms-3 d-flex align-items-center">
//                  <div className="form-check form-switch mb-0">
//                    <input
//                      className="form-check-input"
//                      type="checkbox"
//                      id="themeToggle"
//                      aria-label="Toggle dark mode"
//                      onClick={toggleTheme}
//                    />
//                    <label
//                      className="form-check-label small"
//                      htmlFor="themeToggle"
//                      style={{ color: "#fff" }}
//                    >
//                      <i id="themeIcon" className="bi bi-sun"></i>
//                    </label>
//                  </div>
//                </li>
          
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
// import { motion } from "framer-motion";

// const Navbar = () => {
//   const [darkMode, setDarkMode] = useState(true);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const location = useLocation();

//   const toggleTheme = () => {
//     const newTheme = darkMode ? "light" : "dark";
//     document.body.setAttribute("data-bs-theme", newTheme);
//     document.body.setAttribute("data-theme", newTheme);
//     setDarkMode(!darkMode);
//   };

//   // Default dark theme
//   useEffect(() => {
//     document.body.setAttribute("data-bs-theme", "dark");
//     document.body.setAttribute("data-theme", "dark");
//   }, []);

//   const isActive = (path) => location.pathname === path;

//   return (
//     <motion.nav
//       initial={{ y: -40, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.5, ease: "easeOut" }}
//       className="sticky top-0 z-50 backdrop-blur-md bg-gray-900/50 border-b border-white/10 shadow-lg"
//     >
//       <div className="container flex justify-between items-center py-2">
//         {/* Logo */}
//         <Link
//           to="/"
//           className="navbar-brand flex items-center text-white gap-2 hover:text-blue-400 transition-all duration-200"
//         >
//           <i className="bi bi-shield-lock-fill fs-4 text-blue-400"></i>
//           <div>
//             <div className="fw-bold text-lg">Hackethics138</div>
//             <div className="small opacity-75">Cybersecurity · OSINT · AI</div>
//           </div>
//         </Link>

//         {/* Mobile Menu Toggle */}
//         <button
//           className="lg:hidden text-white text-2xl"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           {menuOpen ? "✖" : "☰"}
//         </button>

//         {/* Nav Links */}
//         <motion.ul
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className={`flex flex-col lg:flex-row lg:static top-full left-0 w-full lg:w-auto bg-gray-900/70 lg:bg-transparent backdrop-blur-md text-white transition-all duration-300 ${
//             menuOpen ? "block" : "hidden lg:flex"
//           }`}
//         >
//           {[
//             { to: "/", label: "Home" },
//             { to: "/courses", label: "Courses" },
//             { to: "/features", label: "Services" },
//             { to: "/osinttool", label: "OSINT Tools" },
//             { to: "/gpt", label: "AI Agent" },
//             { to: "/contact", label: "Contact" },
//             { to: "/dashboard", label: "Dashboard" },
//           ].map((item) => (
//             <motion.li key={item.to} whileHover={{ scale: 1.1 }}>
//               <Link
//                 to={item.to}
//                 onClick={() => setMenuOpen(false)}
//                 className={`block px-3 py-2 rounded-md transition-all duration-200 ${
//                   isActive(item.to)
//                     ? "text-blue-400 border-b-2 border-blue-400"
//                     : "hover:text-blue-400"
//                 }`}
//               >
//                 {item.label}
//               </Link>
//             </motion.li>
//           ))}

//           {/* Clerk Authentication */}
//           <SignedOut>
//             <motion.li whileHover={{ scale: 1.05 }}>
//               <Link
//                 to="/login"
//                 onClick={() => setMenuOpen(false)}
//                 className="block px-3 py-2 hover:text-blue-400"
//               >
//                 Login / Sign Up
//               </Link>
//             </motion.li>
//           </SignedOut>

//           <SignedIn>
//             <li className="px-3 py-2">
//               <UserButton afterSignOutUrl="/" />
//             </li>
//           </SignedIn>

//           {/* Theme Toggle */}
//           <motion.li
//             whileHover={{ rotate: 15 }}
//             className="nav-item ms-3 d-flex align-items-center"
//           >
//             <div className="form-check form-switch mb-0">
//               <input
//                 className="form-check-input cursor-pointer"
//                 type="checkbox"
//                 id="themeToggle"
//                 onClick={toggleTheme}
//               />
//               <label
//                 className="form-check-label small text-white cursor-pointer"
//                 htmlFor="themeToggle"
//               >
//                 <i
//                   id="themeIcon"
//                   className={`bi ${darkMode ? "bi-moon" : "bi-sun"}`}
//                 ></i>
//               </label>
//             </div>
//           </motion.li>
//         </motion.ul>
//       </div>
//     </motion.nav>
//   );
// };

// export default Navbar;
