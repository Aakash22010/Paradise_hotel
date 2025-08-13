import React, { useState, useEffect } from "react";
import axios from "axios";
import { Mirage } from 'ldrs/react'
import 'ldrs/react/Mirage.css'

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  // Check email registration status
  const checkEmailRegistration = async () => {
    if (!email) return false;

    setIsChecking(true);
    try {
      const res = await axios.post("https://paradise-backend-fkix.onrender.com/api/check-email", { email });
      return res.data.exists;
    } catch (error) {
      console.error("Email check error:", error);
      return false;
    } finally {
      setIsChecking(false);
    }
  };

  const handleSendOtp = async () => {
    if (!email) {
      setMessage("Please enter your email");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      // First check if email is already registered
      const isRegistered = await checkEmailRegistration();

      if (isRegistered) {
        setMessage("This email is already registered");
        setIsRegistered(true);
        return;
      }

      // If not registered, send OTP
      const res = await axios.post("https://paradise-backend-fkix.onrender.com/api/send-otp", { email });

      if (res.data.success) {
        setOtpSent(true);
        setMessage("OTP sent to your email!");
        setIsRegistered(false);
      } else {
        setMessage(res.data.message || "Failed to send OTP");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Server error";
      setMessage(`Error: ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setMessage("Please enter OTP");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const res = await axios.post("https://paradise-backend-fkix.onrender.com/api/verify-otp", { email, otp });

      if (res.data.success) {
        setVerified(true);
        setMessage(res.data.message);
        setOtp("");
        setEmail("");
      } else {
        setMessage(res.data.message || "Verification failed");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Verification failed";
      setMessage(`Error: ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset state when email changes
  useEffect(() => {
    if (email) {
      setOtpSent(false);
      setVerified(false);
      setMessage("");
      setIsRegistered(false);
    }
  }, [email]);

  return (
    <div className="user-login">
      <section className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center" data-aos="fade-up">
            <h2 className="fw-bold mb-4">Stay Updated</h2>
            <p className="lead text-muted mb-4">
              Subscribe to our newsletter for exclusive offers and updates
            </p>

            {/* Email Input & Send OTP */}
            <div className="input-group mb-3 mx-auto" style={{ maxWidth: "500px" }}>
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={(otpSent && !verified) || isRegistered}
              />
              <button
                className="btn btn-primary btn-lg px-4"
                type="button"
                onClick={handleSendOtp}
                disabled={isLoading || isChecking || (otpSent && !verified) || isRegistered}
              >
                {isLoading || isChecking ? <Mirage
                size={64} 
                speed={2.5}
                color="white"
                /> : "Send OTP"}
              </button>
            </div>

            {/* OTP Input & Verify */}
            {otpSent && !verified && !isRegistered && (
              <div className="input-group mb-3 mx-auto" style={{ maxWidth: "300px" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={isLoading}
                >
                  {isLoading ? <Mirage
                size={64} 
                speed={2.5}
                color="white"
                />  : "Verify"}
                </button>
              </div>
            )}

            {/* Status Message */}
            {message && (
              <div className={`mt-3 ${message.includes("successfully") || message.includes("Thank you") ? "text-success" :
                  message.includes("already") || isRegistered ? "text-warning" : "text-danger"
                }`}>
                {message}
              </div>
            )}

            {/* Resend option */}
            {otpSent && !verified && !isRegistered && (
              <div className="mt-2">
                <button
                  className="btn btn-link text-secondary"
                  onClick={handleSendOtp}
                  disabled={isLoading}
                >
                  Resend OTP
                </button>
              </div>
            )}

            {/* Try different email for registered users */}
            {isRegistered && (
              <div className="mt-2">
                <button
                  className="btn btn-link text-primary"
                  onClick={() => {
                    setEmail("");
                    setMessage("");
                    setIsRegistered(false);
                  }}
                >
                  Use different email
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserLogin;
