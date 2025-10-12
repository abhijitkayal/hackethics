
import React, { useEffect, useState } from "react";
import axios from "axios";
import Animation from "../animation/bg_animation";

const OsintAndAI = ({userEmail}) => {
  const [mobile, setMobile] = useState("");
  const [insta, setInsta] = useState("");
  const [adhaar, setAdhaar] = useState("");
  const [mail, setMail] = useState(userEmail||"");
  const [loading, setLoading] = useState(true);

  const [mobileResult, setMobileResult] = useState("");
  const [instaResult, setInstaResult] = useState("");
  const [adhaarResult, setAdhaarResult] = useState("");
  const [mailResult, setMailResult] = useState("");

  const [loadingMobile, setLoadingMobile] = useState(false);
  const [loadingInsta, setLoadingInsta] = useState(false);
  const [loadingAdhaar, setLoadingAdhaar] = useState(false);
  const [loadingMail, setLoadingMail] = useState(false);

  const [usageCount, setUsageCount] = useState(
    parseInt(localStorage.getItem("usageCount")) || 0
  );
  const [isPaidUser, setIsPaidUser] = useState(
    localStorage.getItem("isPaidUser") === "true"
  );

  const [showCards, setShowCards] = useState(false); 

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleOSINT = (e, type) => {
    e.preventDefault();

    if (!isPaidUser && usageCount >= 4) {
      alert("Free limit reached. Please upgrade to continue!");
      setShowCards(true); 
      return;
    }

    const simulateLookup = (setter, label, input) => {
      setter("");
      setTimeout(() => {
        setter(`Demo result for ${label}: ${input}`);
        incrementUsage();
      }, 700);
    };

    if (type === "mobile") simulateLookup(setMobileResult, "mobile", mobile);
    if (type === "insta") simulateLookup(setInstaResult, "Instagram", insta);
    if (type === "adhaar") simulateLookup(setAdhaarResult, "Adhaar", adhaar);
    if (type === "mail") simulateLookup(setMailResult, "mail", mail);
  };

  const incrementUsage = () => {
    const newCount = usageCount + 1;
    setUsageCount(newCount);
    localStorage.setItem("usageCount", newCount);
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (amount,plan) => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const { data } = await axios.post("http://localhost:5000/order", {
      amount: amount,
    });
    const email=userEmail;
    const options = {
      key: "rzp_test_RL5AnT6meWeDmw",
      amount: data.amount,
      currency: data.currency,
      name: "HackEthics OSINT",
      description: "Premium Subscription",
      order_id: data.id,
      handler: async function (response) {
        alert("Payment Successful!");
        setIsPaidUser(true);
        localStorage.setItem("isPaidUser", "true");

        await axios.post("http://localhost:5000/store-payment", {
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          email:mail,
          planType: plan,
         
        });
      },
      theme: { color: "#4F46E5" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };


  const checkUserPayment = async () => {
  try {
    const res = await axios.get(`http://localhost:5000/api/check-user/${mail}`);

    if (res.data.paid) {
      setIsPaidUser(true);
      localStorage.setItem("isPaidUser", "true");
      console.log("User is a paid member");
    } else {
      setIsPaidUser(false);
      console.log("User not found in payment records");
    }
  } catch (error) {
    console.error("Error checking payment:", error);
  }
};
useEffect(() => {
  if(mail){
    checkUserPayment();
  }

 
}, [])




  if (loading) return <Animation />;

  return (
    <section className="py-5 container">
      <h2 className="mb-4">OSINT Tools</h2>

      {!isPaidUser && (
        <div className="alert alert-warning small">
          Free usage left: {Math.max(0, 4 - usageCount)} / 4
        </div>
      )}

      <div className="row g-3">
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h6>Mobile Lookup</h6>
            <form onSubmit={(e) => handleOSINT(e, "mobile")}>
              <input
                className="form-control mb-2"
                placeholder="+91 98765 43210"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <button className="btn btn-outline-primary" >Lookup</button>
            </form>
            {loadingMobile ? (
              <div>Fetching...</div>
            ) : (
              mobileResult && (
                <div className="alert alert-info mt-2">{mobileResult}</div>
              )
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h6>Instagram Lookup</h6>
            <form onSubmit={(e) => handleOSINT(e, "insta")}>
              <input
                className="form-control mb-2"
                placeholder="username"
                value={insta}
                onChange={(e) => setInsta(e.target.value)}
              />
              <button className="btn btn-outline-primary">Lookup</button>
            </form>
            {loadingInsta ? (
              <div>Fetching...</div>
            ) : (
              instaResult && (
                <div className="alert alert-info mt-2">{instaResult}</div>
              )
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h6>Adhaar Lookup</h6>
            <form onSubmit={(e) => handleOSINT(e, "adhaar")}>
              <input
                className="form-control mb-2"
                placeholder="1111 2222 3333"
                value={adhaar}
                onChange={(e) => setAdhaar(e.target.value)}
              />
              <button className="btn btn-outline-primary">Lookup</button>
            </form>
            {loadingAdhaar ? (
              <div>Fetching...</div>
            ) : (
              adhaarResult && (
                <div className="alert alert-info mt-2">{adhaarResult}</div>
              )
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h6>Email Lookup</h6>
            <form onSubmit={(e) => handleOSINT(e, "mail")}>
              <input
                className="form-control mb-2"
                placeholder="user@example.com"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
              <button className="btn btn-outline-primary">Lookup</button>
            </form>
            {loadingMail ? (
              <div>Fetching...</div>
            ) : (
              mailResult && (
                <div className="alert alert-info mt-2">{mailResult}</div>
              )
            )}
          </div>
        </div>
      </div>

      {!isPaidUser&&(
        <div className="text-center my-5">
          <button
            className="bg-blue-500 text-white px-5 py-2 rounded-full shadow hover:bg-blue-600"
            onClick={() => {setShowCards(true);console.log(mail)}}
          >
            Go Pro Now 
          </button>
        </div>
      )}

      {!isPaidUser&& showCards && (
        <div className="flex justify-center items-center gap-10 mb-10 ">
          <div className="card p-3 shadow-sm rounded w-25">
            <h3 className="text-xl font-semibold mb-2 text-gray-400 text-center">
              Monthly Plan
            </h3>
            <p className="text-gray-400 mb-4 text-center">₹199 / month</p>
            <ul className="text-sm text-gray-600 mb-4 space-y-1">
              <ol>✔ Unlimited Lookups</ol>
              <ol>✔ Priority Support</ol>
            </ul>
            <button
              onClick={() =>handlePayment(199,"monthly")}
              className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700" 
            >
              Choose Monthly
            </button>
          </div>

          <div className="card p-3 shadow-sm rounded w-25">
            <h3 className="text-xl text-center font-semibold mb-2 text-gray-400">
              Yearly Plan
            </h3>
            <p className="text-gray-500 mb-4 text-center">₹1499 / year</p>
            <ul className="text-sm text-gray-600 mb-4 space-y-1">
              <ol>✔ Everything in Monthly</ol>
              <ol>✔ Save ₹889 yearly</ol>
            </ul>
            <button
              onClick={() =>handlePayment(1499,"yearly")}
              className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700"
            >
              Choose Yearly
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default OsintAndAI;

