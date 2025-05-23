import React from "react";
import './about.css';

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Our Project</h1>
      <p className="about-description">
        Welcome to our innovative platform — driving groundbreaking scientific research and medical breakthroughs.
        Leveraging state-of-the-art machine learning and AI, we tackle complex biological and chemical challenges with precision and efficiency:
      </p>

      <div className="feature-list">
        <div className="feature-item">
          <h3>Lung and Brain Tumor Segmentation</h3>
          <p>
            Utilizing cutting-edge image processing and deep learning models, we detect and analyze tumors in medical scans with high accuracy.
            This not only improves early diagnostics but also assists clinicians in creating more personalized and effective treatment strategies.
          </p>
        </div>

        <div className="feature-item">
          <h3>Protein Visualization</h3>
          <p>
            Explore intricate three-dimensional protein structures to better understand folding mechanisms, binding interactions, and mutations.
            Our visualization tools aid researchers in identifying therapeutic targets and designing novel biologics with enhanced specificity.
          </p>
        </div>

        <div className="feature-item">
          <h3>Molecule Generator</h3>
          <p>
            Innovate faster with AI-driven generation of novel chemical compounds tailored for desired properties.
            This feature accelerates the discovery of new drugs, catalysts, and advanced materials, opening new frontiers in scientific exploration.
          </p>
        </div>

        <div className="feature-item">
          <h3>Vision Transformer (ViT)</h3>
          <p>
            Empowering advanced medical image analysis through Vision Transformer technology, our models offer superior segmentation,
            classification, and prediction capabilities. ViT enables researchers to interpret complex biomedical images with greater clarity and precision.
          </p>
        </div>

        <div className="feature-item">
          <h3>ChemBERTa</h3>
          <p>
            Merging natural language processing (NLP) with chemical informatics, ChemBERTa predicts molecular behaviors directly from chemical text descriptions.
            This powerful approach enhances molecular property prediction, virtual screening, and automated chemical data interpretation.
          </p>
        </div>

        <div className="feature-item">
          <h3>Protein2SMILES</h3>
          <p>
            Bridging proteins and chemical representations, Protein2SMILES translates amino acid sequences into SMILES notation.
            This facilitates deeper exploration of protein chemistry, aids in synthetic biology, and enables innovative bioengineering applications.
          </p>
        </div>

        <div className="feature-item">
          <h3>AutoDocking Simulation</h3>
          <p>
            Virtual molecular docking simulations predict how small molecules bind to target proteins, estimating their binding affinities.
            This feature streamlines the early phases of drug discovery, reducing the need for expensive and time-consuming experimental trials.
          </p>
        </div>
      </div>

      <p className="about-summary">
        Our platform unites AI innovation and biomedical research, empowering scientists to model, analyze, and predict biological and chemical systems with unmatched precision and speed.
        By integrating these tools, we strive to accelerate discoveries that can transform healthcare, materials science, and beyond.
      </p>
    </div>
  );
};

export default About;
