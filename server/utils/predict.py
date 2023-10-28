import pandas as pd
import numpy as np
from tqdm import tqdm
from models.EEGSignal import EEGSignal
from models.NNet import NNet
from config.argparse_config import opt
import os
import torch
from config.constants import labels
from torch.utils.data import DataLoader
from config.torch_config import device


def set_to_zero(x):
    """
    Set values less than 0.1 to zero.
    Args:
        x (float): Input value.
    Returns:
        float: Transformed value.
    """
    if x < 0.1:
        return 0
    else:
        return x


def handle_predictions(predictions):
    """
    Handle and post-process prediction results.
    Args:
        predictions (DataFrame): Prediction results.
    Returns:
        list: List of actions.
    """
    thresholded = predictions.applymap(set_to_zero)
    window_size = 500
    actions = []
    for i in range(0, len(thresholded), window_size):
        results = thresholded.iloc[i : i + window_size]
        zero_rows_count = (results == 0).all(axis=1).sum()
        non_zero_rows_count = (results != 0).any(axis=1).sum()
        if zero_rows_count > non_zero_rows_count:
            actions.append(0)
        else:
            results = results.sum(axis=0).to_numpy()
            idx = results.argmax()
            actions.append(idx + 1)

    return actions


def make_prediction(file):
    testset = []
    x = pd.read_csv(file).iloc[:, 1:].values
    testset.append(x.T.astype(np.float32))
    testset = np.concatenate(testset, axis=1)

    testset = EEGSignal(testset)
    dataloader = DataLoader(testset, batch_size=opt.batch_size, shuffle=False)

    model = NNet()
    current_dir = os.path.dirname(os.path.realpath(__file__))
    model_path = os.path.join(current_dir, "model.pt")
    model.load_state_dict(torch.load(model_path, map_location=torch.device("cpu")))
    y_pred = []

    with torch.no_grad():
        for x in tqdm(dataloader):
            x = x.to(device)
            pred = model(x).detach().cpu().numpy()
            y_pred.append(pred)

    y_pred = np.concatenate(y_pred, axis=0).squeeze(axis=-1)
    submission = pd.DataFrame(y_pred, columns=labels)
    return handle_predictions(submission)
