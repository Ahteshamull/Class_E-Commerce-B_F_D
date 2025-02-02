import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { handleError, handleSuccess } from "../Util";
import { ToastContainer, toast } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS for react-toastify

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Array to hold OTP digits
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const [isVerified, setIsVerified] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for OTP request
  const [email, setEmail] = useState(""); // Email state

  const navigate = useNavigate();

  // Timer effect: Decrement the timer every second
  useEffect(() => {
    if (timer > 0 && !isVerified) {
      const interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timer === 0) {
      setTimerExpired(true); // Timer expired
    }
  }, [timer, isVerified]);

  // Get email from localStorage when the component mounts
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setEmail(savedEmail); // Set email from localStorage
    }
  }, []);

  // Handle OTP digit change
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus next input if value is entered
      if (value !== "" && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  // Handle OTP submission and verification
  const handleSubmit = async (e) => {
    e.preventDefault();

    const enteredOtp = otp.join(""); // Combine OTP digits into a string
    console.log("Entered OTP:", enteredOtp); // Debugging: Check what is sent

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/otp-verify",
        { otp: enteredOtp },
      );

      if (response.data.success) {
        setIsVerified(true);
        handleSuccess("OTP Verified Successfully!");
    
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (response.data.error) {
        handleError("Invalid OTP, try again.");
  
      }
    } catch (error) {
      console.log(error);
      handleError("Failed to verify OTP. Please try again later.");

    }
  };

  // Handle resend OTP logic (this is a placeholder for your API call)
  const handleResendOtp = () => {
    setLoading(true);
    setTimeout(() => {
      setOtp(["", "", "", "", "", ""]); // Clear OTP fields
      setTimer(120); // Reset timer
      setTimerExpired(false); // Reset timer expired state
      setLoading(false);
      toast.success("OTP Sent! You have another 2 minutes."); // Toast success for resend
    }, 1000); // Simulate network delay
  };

  const formattedTime = `${Math.floor(timer / 60)
    .toString()
    .padStart(2, "0")}:${(timer % 60).toString().padStart(2, "0")}`;

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-center text-2xl font-semibold">
          OTP Verification
        </h2>

        <div className="mb-4 text-center">
          <p className="text-sm text-gray-600">
            Enter the OTP sent to your email: <strong>{email}</strong>. The OTP
            will expire in {formattedTime}.
          </p>
        </div>

        {timerExpired ? (
          <div className="text-center text-red-500">
            <p>Time Expired! Please request a new OTP.</p>
            <button
              onClick={handleResendOtp}
              className="mt-4 w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Resending OTP..." : "Resend OTP"}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex justify-between">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  maxLength="1"
                  className="h-12 w-12 rounded-md border border-gray-300 text-center text-lg font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="-"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isVerified || timer === 0}
              className={`w-full rounded-md p-3 ${
                isVerified || timer === 0
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isVerified ? "OTP Verified" : "Verify OTP"}
            </button>
          </form>
        )}

        <div className="mt-4 text-center">
          {isVerified && <p className="text-green-500">OTP Verified!</p>}
        </div>
      </div>
      <ToastContainer /> {/* Add ToastContainer to show notifications */}
    </div>
  );
};

export default OTPVerification;
