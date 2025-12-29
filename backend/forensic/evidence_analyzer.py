import time

class EvidenceAnalyzer:
    def reconstruct_timeline(self, events: list) -> list:
        timeline = []

        for event in events:
            timeline.append({
                "time": time.strftime("%H:%M:%S"),
                "event": event
            })

        return timeline
