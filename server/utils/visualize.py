def generate_eeg_data(unfiltered, filtered):
    results = {"unfiltered": [], "filtered": []}

    col_names = ["Fp1", "Fp2", "F7", "F8"]
    idxs = [0, 1, 2, 6]

    for col, idx in zip(col_names, idxs):
        unfiltered_data = unfiltered.iloc[:1000, idx].to_numpy()
        filtered_data = filtered[idx][:1000]
        unfiltered_points = [
            {"x": i, "y": val} for i, val in enumerate(unfiltered_data)
        ]
        filtered_points = [{"x": i, "y": val} for i, val in enumerate(filtered_data)]
        results["unfiltered"].append({"name": col, "data": unfiltered_points})
        results["filtered"].append({"name": col, "data": filtered_points})
    return results
