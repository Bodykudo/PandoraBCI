import argparse

parser = argparse.ArgumentParser()
parser.add_argument(
    "--n_epochs", type=int, default=1, help="number of epochs of training"
)
parser.add_argument("--batch_size", type=int, default=1024, help="size of the batches")
parser.add_argument("--lr", type=float, default=0.002, help="adam's learning rate")
parser.add_argument(
    "--b1",
    type=float,
    default=0.5,
    help="adam: decay of first-order momentum of gradient",
)
parser.add_argument(
    "--b2",
    type=float,
    default=0.99,
    help="adam: decay of second-order momentum of gradient",
)
parser.add_argument(
    "--in_len",
    type=int,
    default=2**10,
    help="length of the input fed to the neural net",
)
parser.add_argument(
    "--in_channels", type=int, default=32, help="number of signal channels"
)
parser.add_argument("--out_channels", type=int, default=6, help="number of classes")
parser.add_argument("--chunk", type=int, default=1000, help="length of split chunks")

opt, unknown = parser.parse_known_args()
