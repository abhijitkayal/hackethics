import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Animation from "../animation/bg_animation";


const Dashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    return JSON.parse(localStorage.getItem("hack_enrolls")) || [];
  });

  const [user] = useState({
    name: "User",
    role: "Student",
  });

  const [selectedCourse, setSelectedCourse] = useState(null);
  const[loading,setLoading]=useState([]);

  useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
      }, []);


  useEffect(() => {
    localStorage.setItem("hack_enrolls", JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  const clearStorage = () => {
    if (window.confirm("Clear demo enrollments and invoices?")) {
      setEnrolledCourses([]);
      alert("Demo data cleared!");
    }
  };

  const viewInvoice = (course) => {
    setSelectedCourse(course);
  };
     if (loading) return <Animation />;


  return (
    <>
      <section id="dashboard" className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Dashboard</h2>
          <div className="small-muted">Your enrollments & invoices</div>
        </div>

        <div className="row g-3 d-flex align-items-stretch">
          <div className="col-md-4">
            <div className="card p-3">
              <h6>Your profile</h6>
              {enrolledCourses.map((course,index)=>{
                return(
                  <div key={index}>

                 <p className="small-muted mb-1">{course.name}</p>
              <p className="small-muted mb-1">Role: {user.role}</p>
                </div>
                )
                
               
              })}
              {/* <p className="small-muted mb-1">{enrolledCourses.name}</p>
              <p className="small-muted mb-1">Role: {user.role}</p> */}
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={clearStorage}
              >
                Clear Data
              </button>
            </div>
          </div>

          <div className="col-md-8">
            <div className="card p-3">
              <h6>Enrolled Courses</h6>
              {enrolledCourses.length === 0 ? (
                <p className="small-muted">You have no enrollments yet.</p>
              ) : (
                enrolledCourses.map((course, index) => {
                  const status =
                    course.progress >= 100 ? "Completed" : "Active";
                  const badgeClass =
                    course.progress >= 100 ? "bg-secondary" : "bg-success";

                  return (
                    <div
                      key={index}
                      className="mb-3 p-2 border rounded d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <div className="fw-semibold">{course.title}</div>
                        <div className="small-muted">Progress:</div>
                        {/* <div className="progress mb-2">
                          <div
                            className="progress-bar bg-success"
                            role="progressbar"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div> */}
                        <div>Paid: ₹{course.final}</div>
                      </div>
                      <span className={`badge ${badgeClass}`}>{status}</span>
                      <button
                        className="btn btn-sm btn-outline-primary ms-2"
                        onClick={() => viewInvoice(course)}
                      >
                        View Invoice
                      </button>
                    </div>
                  );
                })
              )}
              {enrolledCourses.length > 0 && (
                <button
                  className="btn btn-outline-primary btn-sm mt-2"
                  data-bs-toggle="modal"
                  data-bs-target="#enrolledModal"
                  onClick={() => setSelectedCourse(null)}
                >
                  View Enrolled
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <div
        className="modal fade"
        id="enrolledModal"
        tabIndex="-1"
        aria-labelledby="enrolledModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="enrolledModalLabel">
                {selectedCourse ? "Invoice" : "My Enrolled Courses"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              {selectedCourse ? (
                <>
                  <p>
                    <strong>{selectedCourse.title}</strong>
                  </p>
                  <p className="small-muted">
                    Student: {selectedCourse.name} · {selectedCourse.email}
                  </p>
                  <p>Amount paid: ₹{selectedCourse.final}</p>
                  <p className="small-muted">
                    Order ID (demo): ORD
                    {new Date(selectedCourse.date).getTime()}
                  </p>
                </>
              ) : enrolledCourses.length === 0 ? (
                <p className="small-muted">You have no enrollments yet.</p>
              ) : (
                enrolledCourses.map((course, idx) => (
                  <div key={idx} className="mb-3 p-2 border rounded">
                    <div className="fw-semibold">{course.title}</div>
                    <div className="small-muted">
                      Enrolled on: {new Date(course.date).toLocaleDateString()}
                    </div>
                    <div>
                      Status:{" "}
                      <span
                        className={`badge ${
                          course.progress >= 100
                            ? "bg-secondary"
                            : "bg-success"
                        }`}
                      >
                        {course.progress >= 100 ? "Completed" : "Active"}
                      </span>
                    </div>
                    <div className="small-muted">Progress:</div>
                    <div className="progress mb-2">
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <div>Paid: ₹{course.final}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
