
import React, { useState, useEffect } from "react";
import { useSignUp, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import Animation from '../components/animation/bg_animation'

const CustomSignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [error, setError] = useState("");
    const [status, setStatus] = useState("");
     const[loading,setLoading]=useState([]);
    
      useEffect(() => {
            const timer = setTimeout(() => setLoading(false), 2000);
            return () => clearTimeout(timer);
          }, []);

  

  useEffect(() => {
    if (isSignedIn) navigate("/dashboard");
  }, [isSignedIn, navigate]);

    if (loading) return <Animation />;

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signUp.create({
        emailAddress: email,
        password: password,
      });

     await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
      alert("Verification code sent to your email!");
    } catch (err) {
      console.error(err);
      setError(err.errors?.[0]?.message || "Something went wrong");
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
   
    setStatus("Processing...");
    setError("");

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });
      
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/dashboard");
      } else {
        setError("Verification failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError(err.errors?.[0]?.message || "Invalid verification code");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 bg-light"
      style={{ minHeight: "100vh" }}
    >
      <div className="card shadow p-4" style={{ width: "380px" }}>
        <h3 className="text-center mb-3">Create Your Account</h3>

        {!pendingVerification ? (
          <form onSubmit={handleSignUp}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="alert alert-danger p-2">{error}</div>}

            <button type="submit" className="btn btn-primary w-100">
              Sign Up
            </button>

            <div className="text-center mt-3">
              <small>
                Already have an account?{" "}
                <Link to="/login" className="text-decoration-none">
                  Log in
                </Link>
              </small>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerify}>
            <div className="mb-3">
              <label className="form-label">Enter verification code</label>
              <input
                type="text"
                className="form-control"
                placeholder="123456"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>

            {error && <div className="alert alert-danger p-2">{error}</div>}

            <button type="submit" className="btn btn-success w-100">
              Verify Email
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CustomSignUp;
