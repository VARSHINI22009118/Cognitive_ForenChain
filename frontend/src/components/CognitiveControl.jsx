import { sendBCICommand } from "../services/bciService";

function CognitiveControl({ onAction }) {
  return (
    <div className="cognitive-control">
      <h3>Cognitive Control (BCI)</h3>
      <button onClick={() => onAction(sendBCICommand(90))}>
        Tag Suspicious
      </button>
      <button onClick={() => onAction(sendBCICommand(60))}>
        Mark Safe
      </button>
      <button onClick={() => onAction(sendBCICommand(30))}>
        No Action
      </button>
    </div>
  );
}

export default CognitiveControl;
