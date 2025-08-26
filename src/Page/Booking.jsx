import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaOm,
  FaRupeeSign,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MainNavbar from "../Components/MainNavbar";
import Footer from "../Components/Footer";
import gf from "../assets/img/pandit-1.webp";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPuja, setSelectedPuja] = useState(null);
  const [numberOfPeople, setNumberOfPeople] = useState(5);
  const [poojaData, setPoojaData] = useState(null);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [specialRequirements, setSpecialRequirements] = useState("");
  const [description, setDescription] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [type, setType] = useState("");
  const handlePujaSelection = (puja) => {
    setSelectedPuja(puja);
  };
  const location = useLocation();
  const { poojaId, selectedPlanId } = location.state || {};
  console.log("pooja id", poojaId);
  console.log("Selected Plan ID:", selectedPlanId);
  const [isCashfreeLoaded, setIsCashfreeLoaded] = useState(false);


  const [user, setUser] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    if (poojaId) {
      axios
        .get(`https://api.bookmyyagna.com/pooja/getPooja/${poojaId}`)
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            setPoojaData(response.data.pooja);
          }
        })
        .catch((error) => {
          console.error("Error fetching pooja:", error);
        });
    }
  }, [poojaId]);

  const selectedPlan = poojaData?.poojaPlans?.find(
    (plan) => plan._id === selectedPlanId
  );

  // Log poojaData after it's updated
  useEffect(() => {
    if (poojaData) {
      console.log("Packages Data:", poojaData.poojaPlans);
    }
  }, [poojaData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call with timeout
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset form after showing success message
      setTimeout(() => {
        setIsSuccess(false);
        setSelectedDate(null);
        setSelectedPuja(null);
        setNumberOfPeople(5);
        setAddress("");

        setPhone("");
        setEmail("");
        setSpecialRequirements("");
        setDescription("");
      }, 3000);
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const successVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 120,
      },
    },
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "https://api.bookmyyagna.com/user/getUserProfile",
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          const userData = response.data.user;
          setUser(userData);
          setName(userData.fullName); // <-- correct field
          setEmail(userData.email);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  console.log("user data", user);
  const userId = user?._id || "";
  

 useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
  script.async = true;

  script.onload = () => {
    console.log("✅ Cashfree SDK successfully loaded.");
    setIsCashfreeLoaded(true);
  };

  script.onerror = () => {
    console.error("❌ Failed to load Cashfree SDK.");
    setIsCashfreeLoaded(false);
  };

  document.body.appendChild(script);
  return () => document.body.removeChild(script);
}, []);


const handleOrderedSubmit = async (e) => {
  e.preventDefault();

  if (!specialRequirements) {
    alert("Please enter your address");
    return;
  }
  if (!selectedDate) {
    alert("Please select a puja date");
    return;
  }

  const orderData = {
    poojaId,
    planId: selectedPlanId,
    name,
    phoneNumber: phone,
    address: specialRequirements,
    description,
    amount: selectedPlan?.amount || 0,
    poojaMode: "online",
    dateOfDelivery: selectedDate?.toISOString().split("T")[0],
    userId
  };

  try {
    setIsSubmitting(true);
    const res = await axios.post(
      "https://api.bookmyyagna.com/cashfree/createPayment",
      { name, phone, amount: selectedPlan?.amount || 0, orderData, email },
      { withCredentials: true }
    );

    const paymentSessionId = res?.data?.order?.payment_session_id;
    if (!paymentSessionId) {
      alert("Failed to get payment session ID");
      return;
    }

   if (isCashfreeLoaded && window.Cashfree) {
  const cashfree = new window.Cashfree({ mode: "sandbox" }); 
  
  console.log("Launching Cashfree with session ID:", paymentSessionId);
  cashfree.checkout({
    paymentSessionId,
    redirectTarget: "_self",
  });
} else {
  alert("Cashfree SDK not ready yet. Please wait a moment and try again.");
}

  } catch (error) {
    console.error("Cashfree Error:", error);
    alert("Something went wrong during payment.");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <>
      <MainNavbar />
      <div className="booking-section mt-5">
        <div className="container">
          <motion.div
            className="booking-header"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Book Your Sacred Ceremony</h2>
            <div className="ornament-line ">
              <span className="om-symbol">ॐ</span>
            </div>
            <p>
              Choose from our wide range of authentic Vedic ceremonies performed
              by experienced pandits
            </p>
          </motion.div>

          {isSuccess ? (
            <motion.div
              className="booking-success"
              variants={successVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="success-icon">
                <FaOm />
              </div>
              <h3>Booking Confirmed!</h3>
              <p>
                Your puja has been scheduled successfully. We have sent all
                details to your email.
              </p>
              <p>May divine blessings be with you.</p>
              <div className="mandala-animation"></div>
            </motion.div>
          ) : (
            <div className="booking-container">
              <motion.div
                className="booking-form "
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "23px",
                      color: "#FF8000",
                      fontWeight: "600",
                    }}
                  >
                    Your Selected Puja
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: " center",
                      alignItems: "center",
                    }}
                  >
                    <img src={poojaData?.image} style={{ width: "95%" }} />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "23px",
                        color: "#FF8000",
                        fontWeight: "600",
                      }}
                    >
                      {poojaData?.heading}
                    </div>
                    <div style={{ fontSize: "20px" }}>
                      {poojaData?.subHeading}
                    </div>
                    <div>{poojaData?.rating}</div>
                    <div>
                      <h6>Benifites</h6>
                      <ul>
                        {poojaData?.benefitsOfPooja?.map((benefit) => (
                          <li>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="booking-form"
                variants={formVariants}
                initial="hidden"
                animate="visible"
              >
                <h3>Enter Booking Details</h3>
                <div>
                  <div>
                    <div style={{ fontSize: "20px", fontWeight: "600" }}>
                      Plan Details
                    </div>
                    <div>{selectedPlan?.heading}</div>
                    <div>Amount: ₹{selectedPlan?.amount}</div>

                    <div>
                      <h6>Benefits</h6>
                      <ul>
                        {selectedPlan?.features?.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleOrderedSubmit}>
                  <div className="form-row ">
                    <div className="form-group">
                      <label>Your Name:</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Your Email:</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email name"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">


                    <div className="form-group">
                      <label>Phone Number:</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your contact number"
                        required
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>Select Date of Puja:</label>
                      <DatePicker
                        style={{ width: "275px" }}
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="yyyy-MM-dd"
                        minDate={new Date()}
                        placeholderText="Select a date"
                        className="form-control col-6"
                        required
                      />
                    </div>
                  </div>


                  <div className="form-row">
                    <div className="form-group col-6">
                      <label>Type:</label>
                      <select
                        className="form-control"
                        name="type"
                        value="online"
                        disabled
                      >
                        <option value="online">Online</option>
                      </select>
                      <input type="hidden" name="type" value="online" />
                    </div>
                    <div className="form-group col-6">
                      <label>Pay by:</label>
                      <select
                        className="form-control"
                        name="type"
                        value="online"
                        disabled
                      >
                        <option value="online">Razorpay</option>
                      </select>
                      <input type="hidden" name="type" value="online" />
                    </div>



                  </div>
                  <div className="row">
                    <div className="form-group col-md-6">
                      <label>Address:</label>
                      <textarea
                        value={specialRequirements}
                        onChange={(e) => setSpecialRequirements(e.target.value)}
                        placeholder="Enter Your Address"
                      ></textarea>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Description:</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription (e.target.value)}
                        placeholder="Enter Your Description"
                      ></textarea>
                    </div>
                  </div>


                  <motion.button
                    type="submit"
                    className="book-now-btn"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={!isCashfreeLoaded || isSubmitting}
                  >
                    {isSubmitting ? <span className="loader"></span> : "Pay & Book Now"}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          )}

        </div>

        <div className="decorative-elements">
          <div className="floating-element elem-1"></div>
          <div className="floating-element elem-2"></div>
          <div className="floating-element elem-3"></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Booking;
