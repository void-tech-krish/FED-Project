import React, { memo } from "react";
import LogItem from "./LogItem";

function LogList({ logs }) {
  if (logs.length === 0) {
    return <p className="text-center text-gray-500">No logs available</p>;
  }

  return (
    <div role="list" className="overflow-y-auto h-[60vh]">
      {logs.map((log) => (
        <LogItem key={log.id} log={log} />
      ))}
    </div>
  );
}

export default memo(LogList);