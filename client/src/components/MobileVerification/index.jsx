import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";
import animationData from "../pages/mobile-verification.json"; // Place your animation here
import "./index.css";

const MobileVerification = () => {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const sendOtp = async () => {
        try {
            await axios.post("http://localhost:8080/api/send-otp", { phone });
            setOtpSent(true);
            setError("");
            alert("OTP sent successfully!");
        } catch (error) {
            setError(error.response?.data?.message || "Failed to send OTP");
        }
    };

    const verifyOtp = async () => {
        try {
            await axios.post("http://localhost:8080/api/verify-otp", { phone, otp });
            alert("OTP verified successfully!");
            localStorage.setItem("verifiedPhone", phone);
            navigate("/signup");
        } catch (error) {
            setError(error.response?.data?.message || "Invalid OTP");
        }
    };

    return (
        <div className="mobile-container">
            <div className="mobile-left">
                <Lottie animationData={animationData} loop={true} className="lottie-animation" />
            </div>
            <div className="mobile-right">
                <h2 className="mobile-head">Mobile Verification</h2>
                {!otpSent ? (
                    <>
                        <input
                            type="text"
                            placeholder="Enter mobile number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="input"
                        />
                        <button onClick={sendOtp} className="green_btn">Send OTP</button>
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="input"
                        />
                        <button onClick={verifyOtp} className="green_btn">Verify OTP</button>
                    </>
                )}
                {error && <p className="error_msg">{error}</p>}
            </div>
        </div>
    );
};

export default MobileVerification;
