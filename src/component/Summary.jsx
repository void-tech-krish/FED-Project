import React from "react";

function Summary({ logs }) {
  const errorCount = logs.filter((l) => l.type === "error").length;
  const alertCount = logs.filter((l) => l.type === "alert").length;
  const infoCount = logs.filter((l) => l.type === "info").length;

  return (
    <div className="flex justify-around bg-gray-100 p-4 rounded shadow-md mb-4">
      <p className="text-red-600 font-bold">Errors: {errorCount}</p>
      <p className="text-yellow-600 font-bold">Alerts: {alertCount}</p>
      <p className="text-blue-600 font-bold">Info: {infoCount}</p>
    </div>
  );
}

export default Summary;