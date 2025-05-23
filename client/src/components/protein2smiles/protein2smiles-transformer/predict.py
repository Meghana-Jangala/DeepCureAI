# predict.py

import torch
import os
from models.Transformer import Transformer

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
tokenize = lambda x: list(x)

def predict(model, input_sequence, max_length=150, PAD_token=1, SOS_token=2, EOS_token=3):
    model.eval()
    y_input = torch.tensor([[SOS_token]], dtype=torch.long, device=device)

    for _ in range(max_length):
        tgt_mask = model.get_tgt_mask(y_input.size(1)).to(device)
        pred = model(input_sequence, y_input, tgt_mask)
        next_item = pred.topk(1)[1].view(-1)[-1].item()
        next_item = torch.tensor([[next_item]], device=device)
        y_input = torch.cat((y_input, next_item), dim=1)

        if next_item.view(-1).item() == EOS_token or next_item.view(-1).item() == PAD_token:
            break

    return y_input.view(-1).tolist()

def protein_to_numbers(protein, protein_vocab):
    return [protein_vocab[token] for token in tokenize(protein)]

def smiles_to_string(smiles, smiles_vocab):
    return ''.join([smiles_vocab.get_itos()[word] for word in smiles])
