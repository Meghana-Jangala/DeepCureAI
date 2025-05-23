import { useState } from 'react';
import styles from "./styles.module.css";
import Home from "../Home";
import Brain from "../Brain";
import Lung from "../Lung";
import About from "../About";
import Faqs from "../Faqs";
import ProteinPrediction from "../proteinVisualization/proteinPrediction";
import Drug from "../Drug/Drug";
import ProteinToSMILES from "../protein2smiles/ProteinToSMILES";
import VIT from "../VIT/VIT";
import Chembarta from "../Chembarta";
import LigandProcessor from "../AutoDocking/LigandProcessor";
import ThreeDViewer from "../3DViewer/ThreeDViewer"; // ✅ UPDATED

const Main = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleDropdown = (name) => {
    setDropdownOpen(dropdownOpen === name ? null : name);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "brain": return <Brain />;
      case "lung": return <Lung />;
      case "lung3d": return <ThreeDViewer />; // ✅ UPDATED
      case "about": return <About />;
      case "faqs": return <Faqs />;
      case "protein": return <ProteinPrediction />;
      case "drug": return <Drug />;
      case "protein2smiles": return <ProteinToSMILES />;
      case "vit": return <VIT />;
      case "chembarta": return <Chembarta />;
      case "ligandprocessor": return <LigandProcessor />;
      default: return <Home setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1 onClick={() => { setActiveSection("home"); setMenuOpen(false); }}>DeepCureAI</h1>

        <div className={styles.menu_icon} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✖' : '☰'}
        </div>

        <div className={`${styles.nav_links} ${menuOpen ? styles.open : ""}`}>
          <span
            onClick={() => { setActiveSection("home"); setMenuOpen(false); }}
            className={activeSection === "home" ? styles.active : ""}
          >
            Home
          </span>

          <div
            className={styles.dropdown}
            onMouseEnter={() => handleDropdown("med")}
            onMouseLeave={() => handleDropdown(null)}
          >
            <span className={styles.dropdown_toggle}>Med Diagnosis ▾</span>
            {dropdownOpen === "med" && (
              <div className={styles.dropdown_menu}>
                <span onClick={() => { setActiveSection("brain"); setMenuOpen(false); setDropdownOpen(null); }} className={activeSection === "brain" ? styles.active : ""}>
                  Brain Tumor Segm
                </span>
                <span onClick={() => { setActiveSection("lung"); setMenuOpen(false); setDropdownOpen(null); }} className={activeSection === "lung" ? styles.active : ""}>
                  Lung CT Analysis
                </span>
                <span onClick={() => { setActiveSection("lung3d"); setMenuOpen(false); setDropdownOpen(null); }} className={activeSection === "lung3d" ? styles.active : ""}>
                  Lung 3D Viewer
                </span>
              </div>
            )}
          </div>

          <div
            className={styles.dropdown}
            onMouseEnter={() => handleDropdown("drug")}
            onMouseLeave={() => handleDropdown(null)}
          >
            <span className={styles.dropdown_toggle}>Drug Discovery Tools ▾</span>
            {dropdownOpen === "drug" && (
              <div className={styles.dropdown_menu}>
                <span onClick={() => { setActiveSection("protein"); setMenuOpen(false); setDropdownOpen(null); }} className={activeSection === "protein" ? styles.active : ""}>ProtAIne</span>
                <span onClick={() => { setActiveSection("drug"); setMenuOpen(false); setDropdownOpen(null); }} className={activeSection === "drug" ? styles.active : ""}>Drug Generator</span>
                <span onClick={() => { setActiveSection("vit"); setMenuOpen(false); setDropdownOpen(null); }} className={activeSection === "vit" ? styles.active : ""}>ViT Classifier</span>
                <span onClick={() => { setActiveSection("chembarta"); setMenuOpen(false); setDropdownOpen(null); }} className={activeSection === "chembarta" ? styles.active : ""}>ChemBERTa</span>
                <span onClick={() => { setActiveSection("protein2smiles"); setMenuOpen(false); setDropdownOpen(null); }} className={activeSection === "protein2smiles" ? styles.active : ""}>Protein2SMILES</span>
                <span onClick={() => { setActiveSection("ligandprocessor"); setMenuOpen(false); setDropdownOpen(null); }} className={activeSection === "ligandprocessor" ? styles.active : ""}>AutoDocking</span>
              </div>
            )}
          </div>

          <span onClick={() => { setActiveSection("about"); setMenuOpen(false); }} className={activeSection === "about" ? styles.active : ""}>
            About
          </span>
          <span onClick={() => { setActiveSection("faqs"); setMenuOpen(false); }} className={activeSection === "faqs" ? styles.active : ""}>
            FAQs
          </span>

          <button className={styles.mobile_logout_btn} onClick={handleLogout}>Logout</button>
        </div>

        <button className={styles.white_btn} onClick={handleLogout}>Logout</button>
      </nav>

      <div className={styles.content_container}>
        {renderSection()}
      </div>
    </div>
  );
};

export default Main;
