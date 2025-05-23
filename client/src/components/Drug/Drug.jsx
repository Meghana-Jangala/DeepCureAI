import React, { useState } from 'react';
import './Drug.css';

function Drug() {
  const [molecules, setMolecules] = useState([]);
  const [inputSmiles, setInputSmiles] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMolecules = async () => {
    if (!inputSmiles.trim()) {
      setError('Please enter a compound name or SMILES string.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `http://localhost:5003/generate?smiles=${encodeURIComponent(inputSmiles)}&num=5`
      );
      const data = await response.json();
      console.log("Data received from Flask:", data);

      setMolecules(data.results);
    } catch (error) {
      console.error("Error fetching molecules:", error);
      setError("Failed to fetch generated molecules.");
    }
    setLoading(false);
  };

  return (
    <div className="Drug">
      <h1 className="title">NeuroMed AI Molecule Generator</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter compound name or SMILES string"
          value={inputSmiles}
          onChange={(e) => setInputSmiles(e.target.value)}
        />
        <button onClick={fetchMolecules} disabled={loading}>
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>

      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Analyzing molecular structures...</p>
        </div>
      )}

      {error && <p className="error-text">⚠️ {error}</p>}

      <div className="definitions">
        <h3>What are logP and pIC50?</h3>
        <p><strong>logP:</strong> Lipophilicity measure — affects drug absorption across membranes.</p>
        <p><strong>pIC50:</strong> Inhibitory concentration potency — higher values mean stronger activity.</p>
      </div>

      {!loading && molecules.length > 0 && (
        <div className="molecule-list">
          {molecules.map((mol, index) => {
            const logPValue = Array.isArray(mol.logP) ? mol.logP[0] : mol.logP;
            const pIC50Value = Array.isArray(mol.pIC50) ? mol.pIC50[0] : mol.pIC50;

            return (
              <div key={index} className="molecule-card">
                <p><strong>SMILES:</strong> {mol.smiles}</p>
                {mol.image ? (
                  <img src={mol.image} alt={`Molecule ${index}`} />
                ) : (
                  <p className="invalid-text">Invalid molecule structure</p>
                )}
                <p><strong>logP:</strong> {logPValue ?? 'N/A'}</p>
                <p><strong>pIC50:</strong> {pIC50Value ?? 'N/A'}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Drug;
