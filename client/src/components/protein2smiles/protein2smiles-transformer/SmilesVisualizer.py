# SmilesVisualizer.py
from rdkit import Chem
from rdkit.Chem import Draw
import io

class SmilesVisualizer:
    def __init__(self, smiles):
        self.mol = Chem.MolFromSmiles(smiles)

    def get_molecule_image(self):
        """Generate molecule image and return it as a BytesIO object."""
        if self.mol is None:
            return None
        image = Draw.MolToImage(self.mol, size=(300, 300))
        img_byte_arr = io.BytesIO()
        image.save(img_byte_arr, format='PNG')
        img_byte_arr.seek(0)
        return img_byte_arr
