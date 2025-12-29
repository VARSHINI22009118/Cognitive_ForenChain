import { API_URL } from "./api";

export async function fetchBlockchainLogs() {
  try {
    const response = await fetch(`${API_URL}/api/blockchain/logs`);

    if (!response.ok) {
      throw new Error("Blockchain API returned error");
    }

    return await response.json();
  } catch (error) {
    console.error("Blockchain API error:", error);

    // Rollback-safe fallback
    return {
      transaction: {
        blockNumber: "-",
        blockHash: "N/A",
        txHash: "N/A",
        status: "UNKNOWN",
        contractStatus: "N/A",
        systemHealth: "Unknown",
      },
      logs: [],
    };
  }
}
