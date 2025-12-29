# backend/bci/signal_simulator.py
import random

def simulate_eeg_signal():
    """
    Simulate a single EEG focus level for testing purposes
    Returns integer 0–100
    """
    return random.randint(20, 100)
