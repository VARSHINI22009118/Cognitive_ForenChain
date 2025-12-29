function BlockchainLogTable({ logs }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Evidence Hash</th>
          <th>Action</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log, index) => (
          <tr key={index}>
            <td>{log.hash}</td>
            <td>{log.action}</td>
            <td>{log.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BlockchainLogTable;
