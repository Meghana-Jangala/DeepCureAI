import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from 'lottie-react';
import "./index.css";
import protein from "../pages/protein.json";
import kit from "../pages/kit.json"; // ✅ updated import

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="bg">
      <div className="top-section">
        <div className="left-content">
          <div><Lottie animationData={protein} className='animations' /></div>
          <h1 className="wel-text">Welcome to </h1>
          <h1 className="head">DeepCureAI</h1>
          <p className="para">
            Empowering the future of healthcare with intelligent diagnostics and accelerated drug discovery. We harness cutting-edge AI and deep learning to transform lung disease detection and therapeutic development — driving faster, more accurate, and patient-centric solutions.
          </p>
          <div>
            <button 
              onClick={() => navigate("/login")}
              className="get-start-btn login-btn"
            >
              LOGIN
            </button>

            <button 
              onClick={() => navigate("/mobile-verification")}
              className="get-start-btn"
            >
              REGISTER
            </button>
          </div>
        </div>
        <div className="right-animation">
          <Lottie animationData={kit} className='animations doctor-anim' /> {/* ✅ updated animation */}
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
