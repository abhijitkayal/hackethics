import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";
import Image from "./images.jpeg";
import python from "./python.jpeg"
import bugbounty from "./bugbounty.jpeg"
import Animation from "../animation/bg_animation";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";


const Courses = () => {
  const [showEnroll, setShowEnroll] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({ title: "", price: 0 });
  const [form, setForm] = useState({ name: "", email: "", coupon: "" });
  const [finalPrice, setFinalPrice] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");
  const [enrollments, setEnrollments] = useState([]);
  const[loading,setLoading]=useState([]);
  const [emailError,setEmailError]=useState("");


 const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 2000);
      return () => clearTimeout(timer);
    }, []);
  const coupons = {
    SAVE10: 0.1,
    STUDENT20: 0.2,
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("hack_enrolls") || "[]");
    setEnrollments(saved);
  }, []);

  useEffect(() => {
    if (!selectedCourse.price) return;
    const code = form.coupon.trim().toUpperCase();
    const discount = coupons[code] || 0;
    const final = Math.round(selectedCourse.price * (1 - discount));
    setFinalPrice(final);

    if (discount > 0) {
      setCouponMsg(`${discount * 100}% discount applied!`);
    } else if (code) {
      setCouponMsg("Invalid coupon code");
    } else {
      setCouponMsg("");
    }
  }, [form.coupon, selectedCourse]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const openEnroll = (title, price) => {
    setSelectedCourse({ title, price });
    setForm({ name: "", email: "", coupon: "" });
    setShowEnroll(true);
  };

  const loadRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const startPayment = async () => {

     if (!validateEmail(form.email)) {
      setEmailError("Please enter a valid email address");
      return;
    } else {
      setEmailError("");
    }

    const res = await loadRazorpay(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Check your connection.");
      return;
    }

    try {
      const { data: order } = await axios.post("http://localhost:5000/order", {
        amount: finalPrice, 
        currency: "INR",
      });

      const options = {
        key: "rzp_test_RL5AnT6meWeDmw",
        amount: order.amount,
        currency: order.currency,
        name: "Hackethics138",
        description: selectedCourse.title,
        order_id: order.id,
        handler: function (response) {
          completeEnroll(response);
        },
        prefill: {
          name: form.name || "Demo User",
          email: form.email || "demo@example.com",
        },
        notes: {
          course: selectedCourse.title,
        },
        theme: {
          color: "#0d6efd",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment initialization failed!");
    }
  };

  // const completeEnroll = (paymentResponse) => {
  //   const name = form.name.trim() || "Demo User";
  //   const email = form.email.trim() || "demo@example.com";
  //   const coupon = form.coupon.trim().toUpperCase();
  //   const discount = coupons[coupon] || 0;
  //   const final = Math.round(selectedCourse.price * (1 - discount));

  //   const newEnroll = {
  //     title: selectedCourse.title,
  //     name,
  //     email,
  //     price: selectedCourse.price,
  //     coupon: coupon || null,
  //     final,
  //     date: new Date().toISOString(),
  //     paymentId: paymentResponse.razorpay_payment_id,
  //     progress: Math.floor(Math.random() * 50) + 10,
  //   };

  //   const updated = [...enrollments, newEnroll];
  //   setEnrollments(updated);
  //   localStorage.setItem("hack_enrolls", JSON.stringify(updated));

  //   alert(`Payment successful — ₹${final}. Course added to Dashboard.`);
  //   setShowEnroll(false);
  // };


  
  const completeEnroll = async (paymentResponse) => {
  const name = form.name.trim() || "Demo User";
  const email = form.email.trim() || "demo@example.com";
  const coupon = form.coupon.trim().toUpperCase();
  const discount = coupons[coupon] || 0;
  const final = Math.round(selectedCourse.price * (1 - discount));

  const newEnroll = {
    title: selectedCourse.title,
    name,
    email,
    price: selectedCourse.price,
    final,
    coupon: coupon || null,
    paymentId: paymentResponse.razorpay_payment_id,
    date: new Date().toISOString(),
  };

  try {
    await axios.post("http://localhost:5000/save-course", newEnroll);
    alert(`Payment successful — ₹${final}. Course added to Dashboard.`);
    setShowEnroll(false);
  } catch (err) {
    console.error("Failed to save course:", err);
    alert("Payment done but failed to save course data.");
  }
};


  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const handleProtectedClick = (action) => {
    if (!isSignedIn) {
      console.log(isSignedIn);
      alert("Please login first to continue.");
      
      return;
    }
    action(); 
  };


  const previewCourse = (title) => {
    setSelectedCourse({ title, price: 0 });
    setShowPreview(true);
  };



   if (loading) return <Animation />;


  return (
    <section id="courses" className="py-4">
      <div className="container pb-10 pt-2">
        <div className="d-flex justify-content-between align-items-center mb-1">
        <h2>Courses & Prices</h2>
        <div className="small-muted">
          Choose a plan and apply coupon at checkout
        </div>
      </div>

      <div className="row g-3 d-flex align-items-stretch">
      

        <div className="col-md-4">
          <div className="card p-3 h-100">
            <img
              src={Image}
              alt="Beginner OSINT Course"
              className="img-fluid rounded mb-3"
              
            />

            <div className="d-flex justify-content-between">
              <h5>Advance black hat hacking</h5>
              <div>
                <span className="text-decoration-line-through">₹10,999</span>{" "}
                <span className="badge bg-success">₹10,299</span>
              </div>
            </div>

            <p className="small-muted">Duration - 6 Months </p>
            <h6>Benefit</h6>

            <ul className="small">
              <li>Real Time Projects</li>
              <li>Hands-On Experience</li>
              <li>Verified Cerficate</li>
            </ul>

            <div className="mt-3 d-flex gap-2">
              <button
                className="btn btn-primary"
                onClick={() =>isSignedIn?openEnroll("Advanced Black Hat Hacking", 10299):navigate("/login")}
              >
                Enroll
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => previewCourse("Advanced Black Hat Hacking")}
              >
                Preview
              </button>
            </div>
          </div>
        </div>

    
        <div className="col-md-4">
          <div className="card p-3 h-100">
            <img
              src={bugbounty}
              alt="Beginner OSINT Course"
              className="img-fluid rounded mb-3"
               style={{ height: "210px" }}
            />
            <div className="d-flex justify-content-between">
              <h5>Advance bugbounty</h5>
              <div>
                <span className="badge bg-warning text-dark">₹4,499</span>
              </div>
            </div>
            <p className="small-muted">Duration - 1.5 Months</p>
            <h6>Benefit</h6>
            <ul className="small">
              <li>Real Time Projects</li>
              <li>Hands-On Experience</li>
              <li>Verified Cerficate</li>
            </ul>
            <div className="mt-3 d-flex gap-2">
              <button
                className="btn btn-primary"
                onClick={() =>isSignedIn?openEnroll("Advanced Bugbounty", 4499):navigate("/login")}
              >
                Enroll
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => previewCourse("Advanced Bugbounty")}
              >
                Preview
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 h-100">
            <img
              src={python}
              alt="Beginner OSINT Course"
              className="img-fluid rounded mb-3"
            />{" "}
            <div className="d-flex justify-content-between">
              <h5>Advanced Python programming</h5>
              <div>
                <span className="text-decoration-line-through">₹3,499</span>{" "}
                <span className="badge bg-info text-dark">₹2,999</span>
              </div>
            </div>
            <p className="small-muted">Duration - 2 Months </p>
            <h6>Benefit</h6>
            <ul className="small">
              <li>Real Time Projects</li>
              <li>Hands-On Experience</li>
              <li>Verified Cerficate</li>
            </ul>
            <div className="mt-3 d-flex gap-2">
              <button
                className="btn btn-primary"
                onClick={() => 
                  isSignedIn?openEnroll("Python Programming", 2999):navigate("/login")}
              >
                Enroll
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => previewCourse("Python Programming — Intro")}
              >
                Preview
              </button>
            </div>
          </div>
        </div>
      </div>

      {showEnroll && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Enroll — {selectedCourse.title}</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowEnroll(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>{selectedCourse.title}</strong>
                </p>
                <p className="small-muted">
                  Price:{" "}
                  <span className="fw-semibold">₹{selectedCourse.price}</span>
                </p>

                <div className="mb-2">
                  <label className="form-label">Your name</label>
                  <input
                    name="name"
                    className="form-control"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label">Email</label>
                  <input
                      name="email"
                      type="email"
                      className="form-control"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                    {emailError && <small className="text-danger">{emailError}</small>}
                </div>

                <div className="mb-2">
                  <label className="form-label">Coupon (optional)</label>
                  <input
                    name="coupon"
                    className="form-control"
                    value={form.coupon}
                    onChange={handleChange}
                  />
                </div>

                <div className="mt-2 small-muted">
                  Final price: <strong>₹{finalPrice}</strong>{" "}
                  {couponMsg && <span>({couponMsg})</span>}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowEnroll(false)}
                >
                  Close
                </button>
                <button className="btn btn-primary" onClick={startPayment}>
                  Pay & Enroll
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPreview && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Course preview — {selectedCourse.title}
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setShowPreview(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>{selectedCourse.title}</strong>
                </p>
                <p className="small-muted">Syllabus preview:</p>
                <ul>
                  <li>Week 1 — Intro & ethics</li>
                  <li>Week 2 — Tools & labs</li>
                  <li>Week 3 — Project work</li>
                  <li>Week 4 — Capstone & certificate</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </section>
  );
};

export default Courses;



// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import axios from "axios";
// import Image from "./images.jpeg";
// import python from "./python.jpeg";
// import bugbounty from "./bugbounty.jpeg";
// import Animation from "../animation/bg_animation";
// import { useUser } from "@clerk/clerk-react";
// import { useNavigate } from "react-router-dom";

// const Courses = () => {
//   const [showEnroll, setShowEnroll] = useState(false);
//   const [showPreview, setShowPreview] = useState(false);
//   const [selectedCourse, setSelectedCourse] = useState({ title: "", price: 0 });
//   const [form, setForm] = useState({ name: "", email: "", coupon: "" });
//   const [finalPrice, setFinalPrice] = useState(0);
//   const [couponMsg, setCouponMsg] = useState("");
//   const [enrollments, setEnrollments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [emailError, setEmailError] = useState("");

//   const { isSignedIn } = useUser();
//   const navigate = useNavigate();

//   // Fake delay for loader animation
//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   // Coupon discount
//   const coupons = {
//     SAVE10: 0.1,
//     STUDENT20: 0.2,
//   };

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("hack_enrolls") || "[]");
//     setEnrollments(saved);
//   }, []);

//   useEffect(() => {
//     if (!selectedCourse.price) return;
//     const code = form.coupon.trim().toUpperCase();
//     const discount = coupons[code] || 0;
//     const final = Math.round(selectedCourse.price * (1 - discount));
//     setFinalPrice(final);

//     if (discount > 0) {
//       setCouponMsg(`${discount * 100}% discount applied!`);
//     } else if (code) {
//       setCouponMsg("Invalid coupon code");
//     } else {
//       setCouponMsg("");
//     }
//   }, [form.coupon, selectedCourse]);

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const openEnroll = (title, price) => {
//     setSelectedCourse({ title, price });
//     setForm({ name: "", email: "", coupon: "" });
//     setEmailError("");
//     setShowEnroll(true);
//   };

//   // ✅ Email validation
//   const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const loadRazorpay = (src) => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = src;
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   // ✅ Payment only starts if email is valid
//   const startPayment = async () => {
//     if (!form.name.trim()) {
//       alert("Please enter your name");
//       return;
//     }

//     if (!validateEmail(form.email)) {
//       setEmailError("Please enter a valid email address");
//       return;
//     } else {
//       setEmailError("");
//     }

//     const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");
//     if (!res) {
//       alert("Razorpay SDK failed to load. Check your connection.");
//       return;
//     }

//     try {
//       const { data: order } = await axios.post("http://localhost:5000/order", {
//         amount: finalPrice,
//         currency: "INR",
//       });

//       const options = {
//         key: "rzp_test_RL5AnT6meWeDmw",
//         amount: order.amount,
//         currency: order.currency,
//         name: "Hackethics138",
//         description: selectedCourse.title,
//         order_id: order.id,
//         handler: (response) => completeEnroll(response),
//         prefill: {
//           name: form.name,
//           email: form.email,
//         },
//         notes: {
//           course: selectedCourse.title,
//         },
//         theme: {
//           color: "#0d6efd",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error("Payment error:", err);
//       alert("Payment initialization failed!");
//     }
//   };

//   const completeEnroll = async (paymentResponse) => {
//     const newEnroll = {
//       title: selectedCourse.title,
//       name: form.name.trim(),
//       email: form.email.trim(),
//       price: selectedCourse.price,
//       final: finalPrice,
//       coupon: form.coupon.trim().toUpperCase() || null,
//       paymentId: paymentResponse.razorpay_payment_id,
//       date: new Date().toISOString(),
//     };

//     try {
//       await axios.post("http://localhost:5000/save-course", newEnroll);
//       alert(`Payment successful — ₹${finalPrice}. Course added to Dashboard.`);
//       setShowEnroll(false);
//     } catch (err) {
//       console.error("Failed to save course:", err);
//       alert("Payment done but failed to save course data.");
//     }
//   };

//   const previewCourse = (title) => {
//     setSelectedCourse({ title, price: 0 });
//     setShowPreview(true);
//   };

//   if (loading) return <Animation />;

//   return (
//     <section id="courses" className="py-4">
//       <div className="container pb-10 pt-2">
//         <h2>Courses & Prices</h2>
//         <div className="small-muted mb-3">Choose a plan and apply coupon at checkout</div>

//         {/* Course Cards */}
//         <div className="row g-3 d-flex align-items-stretch">
//           {/* Example Course */}
//           <div className="col-md-4">
//             <div className="card p-3 h-100">
//               <img src={Image} alt="Advanced Hacking" className="img-fluid rounded mb-3" />
//               <div className="d-flex justify-content-between">
//                 <h5>Advanced Black Hat Hacking</h5>
//                 <div>
//                   <span className="text-decoration-line-through">₹10,999</span>{" "}
//                   <span className="badge bg-success">₹10,299</span>
//                 </div>
//               </div>
//               <p className="small-muted">Duration - 6 Months</p>
//               <ul className="small">
//                 <li>Real Time Projects</li>
//                 <li>Hands-On Experience</li>
//                 <li>Verified Certificate</li>
//               </ul>
//               <div className="mt-3 d-flex gap-2">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() =>
//                     isSignedIn
//                       ? openEnroll("Advanced Black Hat Hacking", 10299)
//                       : navigate("/login")
//                   }
//                 >
//                   Enroll
//                 </button>
//                 <button
//                   className="btn btn-outline-secondary"
//                   onClick={() => previewCourse("Advanced Black Hat Hacking")}
//                 >
//                   Preview
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Enrollment Modal */}
//         {showEnroll && (
//           <div
//             className="modal fade show"
//             style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
//           >
//             <div className="modal-dialog modal-lg">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">Enroll — {selectedCourse.title}</h5>
//                   <button className="btn-close" onClick={() => setShowEnroll(false)}></button>
//                 </div>
//                 <div className="modal-body">
//                   <div className="mb-2">
//                     <label className="form-label">Your Name</label>
//                     <input
//                       name="name"
//                       className="form-control"
//                       value={form.name}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className="mb-2">
//                     <label className="form-label">Email</label>
//                     <input
//                       name="email"
//                       type="email"
//                       className="form-control"
//                       value={form.email}
//                       onChange={handleChange}
//                       required
//                     />
//                     {emailError && <small className="text-danger">{emailError}</small>}
//                   </div>

//                   <div className="mb-2">
//                     <label className="form-label">Coupon (optional)</label>
//                     <input
//                       name="coupon"
//                       className="form-control"
//                       value={form.coupon}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="mt-2 small-muted">
//                     Final price: <strong>₹{finalPrice}</strong>{" "}
//                     {couponMsg && <span>({couponMsg})</span>}
//                   </div>
//                 </div>

//                 <div className="modal-footer">
//                   <button className="btn btn-secondary" onClick={() => setShowEnroll(false)}>
//                     Close
//                   </button>
//                   <button className="btn btn-primary" onClick={startPayment}>
//                     Pay & Enroll
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Courses;
