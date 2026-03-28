import React from "react";
import LogList from "./LogList";

function Errors({ logs = [] }) {
  const errorLogs = logs.filter((l) => l.type === "error");

  return (
    <div className="h-full w-full animate-fadeIn">
      <h1 className="text-3xl font-extrabold mb-6 text-red-500 text-center">
        Error Logs
      </h1>

      <div className="card h-[60vh] overflow-y-auto animate-slideUp">
        <LogList logs={errorLogs} />
      </div>
    </div>
  );
}

export default Errors;
