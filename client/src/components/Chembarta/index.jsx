import React, { useState, useEffect } from 'react';
import { Beaker, Search, ArrowRight, Loader, AlertCircle, CheckCircle2, ChevronDown } from 'lucide-react';
import './chemberta.css';

const ChembertDark = () => {
    const [userInput, setUserInput] = useState('');
    const [prediction, setPrediction] = useState(null);
    const [submittedInput, setSubmittedInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showExamples, setShowExamples] = useState(false);
    const [showInfo, setShowInfo] = useState(true);

    const examples = [
        "CCO<mask>",
        "C1=CC=C(C=C1)C<mask>",
        "CC(C)=CCCC(C)=CC<mask>"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPrediction(null);
        setError(null);

        try {
            const response = await fetch('http://localhost:5002/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_input: userInput }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Prediction failed');

            setPrediction(data.prediction);
            setSubmittedInput(userInput);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const selectExample = (example) => setUserInput(example);

    const [molecules, setMolecules] = useState([]);

    useEffect(() => {
        const mols = [];
        for (let i = 0; i < 15; i++) {
            mols.push({
                id: i,
                left: Math.random() * 100,
                top: Math.random() * 100,
                size: Math.random() * 30 + 20,
                duration: Math.random() * 20 + 10,
                delay: Math.random() * 10
            });
        }
        setMolecules(mols);
    }, []);

    return (
        <div className="chembert-container">
            <div className="background">
                {molecules.map(mol => (
                    <div key={mol.id} className="molecule" style={{
                        left: `${mol.left}%`,
                        top: `${mol.top}%`,
                        width: `${mol.size}px`,
                        height: `${mol.size}px`,
                        animationDuration: `${mol.duration}s`,
                        animationDelay: `${mol.delay}s`
                    }} />
                ))}
            </div>
            <div className="card">
                <header className="header">
                    <Beaker className="icon" />
                    <h1>Masked SMILES Predictor</h1>
                    <p>Predict masked atoms using ChemBERT</p>
                </header>

                {showInfo && (
                    <div className="info-box">
                        <AlertCircle className="info-icon" />
                        <p>Use <code>&lt;mask&gt;</code> to specify where prediction is needed. (e.g., CCO&lt;mask&gt;)</p>
                        <button onClick={() => setShowInfo(false)} className="close-info">×</button>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="form">
                    <div className="input-group">
                        <Search className="input-icon" />
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Enter SMILES with <mask>"
                            required
                        />
                    </div>
                    <div className="actions">
                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? <Loader className="loading" /> : <ArrowRight />}
                            {loading ? ' Predicting...' : ' Predict'}
                        </button>

                        <div className="dropdown">
                            <button type="button" onClick={() => setShowExamples(!showExamples)}>
                                Examples <ChevronDown className={showExamples ? 'open' : ''} />
                            </button>
                            {showExamples && (
                                <div className="dropdown-menu">
                                    {examples.map((ex, i) => (
                                        <button key={i} type="button" onClick={() => selectExample(ex)}>
                                            {ex}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </form>

                {error && <div className="error"><AlertCircle /> {error}</div>}

                {submittedInput && (
                    <div className="results">
                        <h2><CheckCircle2 /> Input SMILES</h2>
                        <p>{submittedInput}</p>
                    </div>
                )}

                {prediction && (
                    <div className="results">
                        <h2><Beaker /> Top 5 Predictions</h2>
                        <div dangerouslySetInnerHTML={{ __html: prediction }} className="prediction" />
                    </div>
                )}
            </div>

            <footer className="footer">
                © 2025 ChemBERT Predictor
            </footer>
        </div>
    );
};

export default ChembertDark;