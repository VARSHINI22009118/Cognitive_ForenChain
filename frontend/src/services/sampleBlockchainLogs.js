// src/services/sampleBlockchainLogs.js

const baseTime = new Date();

const timePlus = (seconds) => {
  const d = new Date(baseTime.getTime() + seconds * 1000);
  return d.toLocaleTimeString("en-IN", { hour12: false });
};

export const generateSampleBlockchainLogs = () => {
  return [
    {
      command: "COLLECT_EVIDENCE",
      logs: [
        // 🧠 BCI
        {
          time: timePlus(0),
          property: "BCI Signal",
          action: "Decoded",
          notes: "COLLECT_EVIDENCE",
        },

        // 🛡️ CSP
        {
          time: timePlus(1),
          property: "CSP Engine",
          action: "Validated",
          notes: "Command Authorized",
        },

        // 🔍 Digital Forensics
        {
          time: timePlus(2),
          property: "Evidence Hash",
          action: "Generated",
          notes: "0xA91F...D3C9",
        },

        {
          time: timePlus(3),
          property: "Forensic Analysis",
          action: "Completed",
          notes: "No Tampering Detected",
        },

        // 🔗 Blockchain
        {
          time: timePlus(4),
          property: "Blockchain",
          action: "Block Created",
          notes: "Immutable Record Stored",
          highlight: true,
        },
      ],
    },

    {
      command: "TAG_EVIDENCE",
      logs: [
        {
          time: timePlus(0),
          property: "BCI Signal",
          action: "Decoded",
          notes: "TAG_EVIDENCE",
        },
        {
          time: timePlus(1),
          property: "CSP Engine",
          action: "Validated",
          notes: "Tag Approved",
        },
        {
          time: timePlus(2),
          property: "Evidence ID",
          action: "Tagged",
          notes: "MemoryDump_001",
        },
        {
          time: timePlus(3),
          property: "Blockchain",
          action: "Updated",
          notes: "Tag Permanently Stored",
          highlight: true,
        },
      ],
    },

    {
      command: "MARK_ANOMALY",
      logs: [
        {
          time: timePlus(0),
          property: "BCI Signal",
          action: "Decoded",
          notes: "MARK_ANOMALY",
        },
        {
          time: timePlus(1),
          property: "CSP Monitor",
          action: "Alert Raised",
          notes: "Suspicious Pattern Detected",
        },
        {
          time: timePlus(2),
          property: "Forensic Engine",
          action: "Anomaly Confirmed",
          notes: "Unauthorized Access",
        },
        {
          time: timePlus(3),
          property: "Smart Contract",
          action: "Locked",
          notes: "Access Frozen",
          highlight: true,
        },
      ],
    },
  ];
};
