import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './LigandProcessor.module.css';

const LigandProcessor = () => {
  const [ECnumber, setECnumber] = useState('');
  const [ligandId, setLigandId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pdbContent, setPdbContent] = useState(null);
  const viewerRef = useRef(null);

  useEffect(() => {
    if (pdbContent && viewerRef.current) {
      viewerRef.current.innerHTML = ''; // Clear previous viewer

      const viewer = window.$3Dmol.createViewer(viewerRef.current, {
        backgroundColor: '#0c0c1e', 
      });

      viewer.addModel(pdbContent, 'pdb');
      viewer.setStyle({}, { cartoon: { color: 'spectrum' } });
      viewer.zoomTo();
      viewer.render();
    }
  }, [pdbContent]);

  const handleProcess = async () => {
    setLoading(true);
    setError('');
    setPdbContent(null);

    try {
      const response = await axios.post('http://localhost:5004/process', {
        ECnumber,
        LIGAND_ID: ligandId
      });

      if (response.data.pdb_content) {
        setPdbContent(response.data.pdb_content);
      } else {
        setError('No PDB content received.');
      }
    } catch (err) {
      setError('Failed to process. Please check the EC number and ligand ID.');
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className={styles.mainContainer}>
      {/* Input Form */}
      <div className={styles.leftSection}>
        <h2 className={styles.title}>🔹 AutoDock Ligand Processor</h2>

        <div className={styles.inputGroup}>
          <label className={styles.label}>EC Number:</label>
          <input
            type="text"
            value={ECnumber}
            onChange={(e) => setECnumber(e.target.value)}
            className={styles.inputField}
            placeholder="e.g. 3.1.1.1"
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Ligand ID:</label>
          <input
            type="text"
            value={ligandId}
            onChange={(e) => setLigandId(e.target.value)}
            className={styles.inputField}
            placeholder="e.g. ATP"
          />
        </div>

        <button
          onClick={handleProcess}
          disabled={loading}
          className={styles.predictButton}
        >
          {loading ? 'Processing...' : 'Run AutoDock'}
        </button>

        {error && <p className={styles.error}>{error}</p>}
      </div>

      {/* Right Section */}
      <div className={styles.rightSection}>
        {/* CASE 1: If no PDB content yet, show placeholder */}
        {!pdbContent && (
          <div className={styles.viewerPlaceholder}>
            Upload EC number and Ligand ID to view structure.
          </div>
        )}

        {/* CASE 2: If PDB content is ready, no container, just attach directly */}
        <div
          ref={viewerRef}
          style={{
            display: pdbContent ? 'block' : 'none',
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    </div>
  );
};

export default LigandProcessor;
