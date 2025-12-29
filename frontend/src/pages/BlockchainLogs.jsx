import BlockchainLogTable from "../components/BlockchainLogTable";
import { getBlockchainLogs } from "../services/blockchainService";

function BlockchainLogs() {
  return <BlockchainLogTable logs={getBlockchainLogs()} />;
}

export default BlockchainLogs;
