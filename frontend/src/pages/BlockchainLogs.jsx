import BlockchainLogTable from "../components/BlockchainLogTable";
import { fetchBlockchainLogs } from "../services/blockchainService";

function BlockchainLogs() {
  return <BlockchainLogTable logs={fetchBlockchainLogs()} />;
}

export default BlockchainLogs;
