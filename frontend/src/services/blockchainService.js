let logs = [];

export function addBlockchainLog(action) {
  logs.push({
    hash: "abc123",
    action,
    time: new Date().toISOString(),
  });
}

export function getBlockchainLogs() {
  return logs;
}
