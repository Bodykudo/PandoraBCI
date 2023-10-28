import numpy as np
import torch
from torch.utils.data import Dataset
from config.argparse_config import opt


class EEGSignal(Dataset):
    def __init__(self, data, m=1.008, s=0.005):
        self.data = data
        self.eps = 1e-7
        self.data -= m
        self.data /= s + self.eps

    def __getitem__(self, i):
        raw_data = self.data[:, max(0, i - opt.in_len + 1) : i + 1]

        pad = opt.in_len - raw_data.shape[1]
        if pad:
            raw_data = np.pad(
                raw_data, ((0, 0), (pad, 0)), "constant", constant_values=0
            )

        raw_data = torch.from_numpy(raw_data.astype(np.float32))
        return raw_data

    def __len__(self):
        return self.data.shape[1]
