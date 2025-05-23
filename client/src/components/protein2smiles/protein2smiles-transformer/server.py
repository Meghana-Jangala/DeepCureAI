# server.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import os
import base64
from models.Transformer import Transformer
from predict import predict, protein_to_numbers, smiles_to_string
from SmilesVisualizer import SmilesVisualizer

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Initialize app
app = Flask(__name__)
CORS(app)

# Load model and vocab
root = os.path.dirname(__file__)
protein_vocab = torch.load(os.path.join(root, 'utils/vocab/protein-vocab.pt'))
smiles_vocab = torch.load(os.path.join(root, 'utils/vocab/smiles-vocab.pt'))

model = Transformer(
    src_tokens=len(protein_vocab),
    trg_tokens=len(smiles_vocab),
    dim_model=256,
    num_heads=8,
    num_encoder_layers=6,
    num_decoder_layers=6,
    dropout_p=0.1
).to(device)

model.load_state_dict(torch.load(os.path.join(root, 'checkpoints/checkpoint.pth'), map_location=device))
model.eval()

@app.route('/predict', methods=['POST'])
def predict_smiles():
    data = request.get_json()
    protein_seq = data.get('protein_sequence', '')

    if not protein_seq:
        return jsonify({'error': 'No protein sequence provided.'}), 400

    try:
        input_tensor = torch.tensor([protein_to_numbers(protein_seq, protein_vocab)], dtype=torch.long, device=device)
        predicted_tokens = predict(model, input_tensor, max_length=150, PAD_token=1, SOS_token=2, EOS_token=3)
        smiles = smiles_to_string(predicted_tokens[1:-1], smiles_vocab)

        # Generate molecule image
        visualizer = SmilesVisualizer(smiles)
        mol_img_buffer = visualizer.get_molecule_image()

        if mol_img_buffer is None:
            return jsonify({'error': 'Invalid SMILES, could not generate molecule image.'}), 400

        img_base64 = base64.b64encode(mol_img_buffer.read()).decode('utf-8')

        return jsonify({'smiles': smiles, 'image': img_base64})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5006)
