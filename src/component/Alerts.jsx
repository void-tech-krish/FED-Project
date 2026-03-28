import React from "react";
import LogList from "./LogList";

function Alerts({ logs }) {
  const alertLogs = logs.filter((l) => l.type === "alert");

  return (
    <div className="h-full w-full animate-fadeIn">
      {/* Title */}
      <h1 className="text-3xl font-extrabold mb-6 text-yellow-400 text-center">
        Alert Logs
      </h1>

      {/* Alert Logs Card */}
      <div className="card h-[60vh] overflow-y-auto animate-slideUp">
        <LogList logs={alertLogs} />
      </div>
    </div>
  );
}

export default Alerts;