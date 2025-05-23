import React, { useState, useEffect, useRef } from 'react';
import './home.css';
import pc from "../pages/ligand.png";
import Lottie from 'lottie-react';
import connectAnimation from '../pages/Animation - 1746722164711.json'; // 🔄 Change filename if needed

const HomeAlternate = ({ setActiveSection }) => {
  const [showIntro, setShowIntro] = useState(false);
  const [activeTab, setActiveTab] = useState('diagnosis');
  const contactRef = useRef(null);
  const toggleSectionRef = useRef(null);

  useEffect(() => {
    setShowIntro(true);
  }, []);

  const scrollToContact = () => {
    contactRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToToggleSection = () => {
    toggleSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-alt-container">
      <header className={`intro-section ${showIntro ? 'show' : ''}`}>
        <div className="intro-text">
          <h1>DeepCureAI</h1>
          <p>Shaping the Future of Healthcare with Smarter AI</p>
          <div className="intro-buttons">
            <button className="primary-btn" onClick={() => setActiveSection("about")}>Explore More</button>
            <button className="secondary-btn" onClick={scrollToContact}>Reach Out</button>
          </div>
        </div>
      </header>

      {/* Toggle Section */}
      <section className="toggle-section" ref={toggleSectionRef}>
        <div className="toggle-buttons">
          <button
            className={`toggle-btn ${activeTab === 'diagnosis' ? 'active' : ''}`}
            onClick={() => setActiveTab('diagnosis')}
          >
            Med Diagnosis
          </button>
          <button
            className={`toggle-btn ${activeTab === 'drug' ? 'active' : ''}`}
            onClick={() => setActiveTab('drug')}
          >
            Drug Discovery
          </button>
        </div>

        <div className="toggle-content">
          {activeTab === 'diagnosis' && (
            <div className="diagnosis-section">
              <h3>AI-Powered Medical Diagnosis</h3>
              <p>
                Our AI identifies patterns in symptoms, scans, and history to assist professionals with accurate diagnostics in seconds.
              </p>

              <div className="feature-cards">
                <div className="feature-card" onClick={() => setActiveSection('brain')}>
                  <h4>Brain Tumor Segmentation</h4>
                  <p>Advanced AI models segment brain tumors precisely for better treatment planning.</p>
                </div>

                <div className="feature-card" onClick={() => setActiveSection('lung')}>
                  <h4>Lung CT Analysis</h4>
                  <p>Detect lung anomalies with high accuracy using deep CT scan analysis.</p>
                </div>

                <div className="feature-card" onClick={() => setActiveSection('lung3d')}>
                  <h4>Lung 3D Viewer</h4>
                  <p>Interactive 3D visualization of lungs for enhanced clinical insights.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'drug' && (
            <div className="drug-section">
              <h3>Accelerated Drug Discovery</h3>
              <p>
                From molecule screening to predictive binding, DeepCureAI accelerates pharmaceutical research like never before.
              </p>

              <div className="feature-cards drug-grid">
                <div className="feature-card" onClick={() => setActiveSection('protein')}>
                  <h4>ProtAIne</h4>
                  <p>Predict protein 3D structures from sequence using advanced transformers.</p>
                </div>
                <div className="feature-card" onClick={() => setActiveSection('protein2smiles')}>
                  <h4>Protein2SMILES</h4>
                  <p>Generate potential drug-like SMILES directly from target protein sequences.</p>
                </div>
                <div className="feature-card" onClick={() => setActiveSection('drug')}>
                  <h4>Drug Generator</h4>
                  <p>Design novel compounds using generative AI models for target interactions.</p>
                </div>
              </div>

              <div className="feature-cards drug-grid">
                <div className="feature-card" onClick={() => setActiveSection('vit')}>
                  <h4>ViT Classifier</h4>
                  <p>Use vision transformers to classify molecular interaction images effectively.</p>
                </div>
                <div className="feature-card" onClick={() => setActiveSection('chembarta')}>
                  <h4>ChemBERTa</h4>
                  <p>Analyze molecular properties using language models trained on SMILES.</p>
                </div>
                <div className="feature-card" onClick={() => setActiveSection('ligandprocessor')}>
                  <h4>AutoDocking</h4>
                  <p>Prepare ligand files and automate docking workflows for virtual screening.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="image-showcase">
        <img src={pc} alt="AI-Ligand Interaction" className="main-visual" />
      </section>

      {/* Highlights Section */}
      <section className="highlights">
        <h2>What Sets Us Apart</h2>
        <div className="highlight-cards">
          <div className="card">
            <h3>Precision Analytics</h3>
            <p>Our models offer real-time insights with clinical-level accuracy.</p>
          </div>
          <div className="card">
            <h3>Streamlined Research</h3>
            <p>From protein folding to ligand docking, we reduce discovery cycles drastically.</p>
          </div>
          <div className="card">
            <h3>Global Collaboration</h3>
            <p>Empowering institutions worldwide with open, AI-powered platforms.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Be Part of the Revolution</h2>
        <p>Join researchers and innovators leveraging AI to combat disease faster and smarter.</p>
        <button className="primary-btn" onClick={scrollToToggleSection}>Start Now</button>
      </section>

      {/* Contact Form with Lottie */}
      <section className="contact-area" ref={contactRef}>
        <h2>Connect with Us</h2>
        <div className="contact-content">
          <form className="contact-form">
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <textarea placeholder="Message" rows="4" required></textarea>
            <button type="submit">Submit</button>
          </form>
          <div className="lottie-container">
            <Lottie animationData={connectAnimation} loop autoplay />
          </div>
        </div>
        <p className="contact-note">
          Or email us directly at <strong>drugseek.med@gmail.com</strong>
        </p>
      </section>

      <footer className="footer-alt">
        <p>© 2025 DeepCureAI. Empowering Medical Innovation.</p>
      </footer>
    </div>
  );
};

export default HomeAlternate;
