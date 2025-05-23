import React, { useEffect, useRef } from 'react';
import './ProteinViewer.css';

const ProteinViewer = ({ pdbData }) => {
  const viewerRef = useRef(null);
  const viewerInstanceRef = useRef(null);

  useEffect(() => {
    if (!pdbData || !window.$3Dmol || !viewerRef.current) return;

    viewerRef.current.innerHTML = ''; // Clear previous content

    const viewer = window.$3Dmol.createViewer(viewerRef.current, {
      backgroundColor: '#1e1e1e',
    });

    try {
      viewer.addModel(pdbData, 'pdb');
      viewer.setStyle({}, { cartoon: { color: 'spectrum' } });
      viewer.zoomTo();
      viewer.spin(true);
      viewer.render();
      viewerInstanceRef.current = viewer;

      // Trigger resize to make it fill the parent
      setTimeout(() => viewer.resize(), 100);
    } catch (error) {
      console.error('Error rendering protein:', error);
    }

    return () => {
      viewerInstanceRef.current = null;
    };
  }, [pdbData]);

  return (
    <div className="viewer-wrapper">
      <div ref={viewerRef} className="viewer-box" />
    </div>
  );
};

export default ProteinViewer;
