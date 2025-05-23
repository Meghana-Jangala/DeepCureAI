import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [protein, setProtein] = useState('');
  const [smiles, setSmiles] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSmiles('');
    setImage('');
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5006/api/predict', {
        input: protein,
        vis: true
      });

      setSmiles(res.data.smiles);
      if (res.data.image) setImage(res.data.image);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Protein to SMILES Translator</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Protein Sequence</label>
          <textarea
            className="form-control"
            rows="3"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            placeholder="Enter protein sequence"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict SMILES'}
        </button>
      </form>

      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}

      {smiles && (
        <div className="mt-4">
          <h5>Predicted SMILES:</h5>
          <code>{smiles}</code>
        </div>
      )}

      {image && (
        <div className="mt-3">
          <h5>Structure Visualization:</h5>
          <img src={image} alt="Molecule" className="img-fluid border" />
        </div>
      )}
    </div>
  );
}

export default App;
