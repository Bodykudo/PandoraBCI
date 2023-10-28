import pandas as pd
import mne
import numpy as np


def read_data(fname):
    data = pd.read_csv(fname)
    clean = data.drop(["id"], axis=1)  # remove id
    return clean


def perform_ica_denoising(channel_names, raw_eeg_data, sampling_frequency=500):
    montage = mne.channels.make_standard_montage("standard_1020")
    info = mne.create_info(
        ch_names=channel_names,
        sfreq=sampling_frequency,
        ch_types=["eeg"] * len(channel_names),
    )
    info.set_montage(montage)
    raw = mne.io.RawArray(raw_eeg_data, info)
    raw.filter(l_freq=7, h_freq=40)
    ica = mne.preprocessing.ICA(n_components=20, random_state=97, max_iter=800)
    ica.fit(raw)
    raw_cleaned = ica.apply(raw)
    return raw_cleaned.get_data()


def convert_np_int64_to_int(obj):
    if isinstance(obj, np.int64):
        return int(obj)
    elif isinstance(obj, np.ndarray):
        return obj.tolist()
    else:
        raise TypeError("Object not serializable")
