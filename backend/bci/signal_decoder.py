# backend/bci/signal_decoder.py

from config import FOCUS_THRESHOLD_SUSPICIOUS, FOCUS_THRESHOLD_SAFE

def decode_signal(focus_level):
    """
    Converts a numeric focus level into a cognitive signal
    """
    if focus_level >= FOCUS_THRESHOLD_SUSPICIOUS:
        return "HIGH_FOCUS"
    elif focus_level >= FOCUS_THRESHOLD_SAFE:
        return "MEDIUM_FOCUS"
    else:
        return "LOW_FOCUS"
