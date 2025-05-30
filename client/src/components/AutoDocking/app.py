# backend/app.py

from flask import Flask, request, jsonify
import requests
from rcsbsearchapi.search import TextQuery
from rcsbsearchapi import rcsb_attributes as attrs
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def download_pdb_and_ligand(ECnumber, LIGAND_ID):
    q1 = attrs.rcsb_polymer_entity.rcsb_ec_lineage.id == ECnumber
    q2 = TextQuery(LIGAND_ID)

    query = q1 & q2
    results = list(query())

    if not results:
        return None, None

    pdb_id = results[0].lower()
    ligand_id = LIGAND_ID.lower()

    pdb_response = requests.get(f"https://files.rcsb.org/download/{pdb_id}.pdb")
    ligand_response = requests.get(f"https://files.rcsb.org/ligands/download/{ligand_id}_ideal.sdf")

    if pdb_response.status_code != 200 or ligand_response.status_code != 200:
        return None, None

    pdb_content = pdb_response.text
    ligand_content = ligand_response.text

    return pdb_content, ligand_content

@app.route('/process', methods=['POST'])
def process_ligand():
    try:
        data = request.get_json()
        ECnumber = data.get('ECnumber')
        LIGAND_ID = data.get('LIGAND_ID')

        if not ECnumber or not LIGAND_ID:
            return jsonify({"error": "ECnumber and LIGAND_ID are required"}), 400

        pdb_content, ligand_content = download_pdb_and_ligand(ECnumber, LIGAND_ID)

        if not pdb_content or not ligand_content:
            return jsonify({"error": "Failed to download PDB or ligand data"}), 400

        return jsonify({
            "pdb_content": pdb_content
        }), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5004)
