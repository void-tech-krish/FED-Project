import React from "react";

function LogItem({ log }) {
  const { type, message, timestamp } = log;

  const highlightClass =
    type === "error"
      ? "bg-red-100 border-red-500"
      : type === "alert"
      ? "bg-yellow-100 border-yellow-500"
      : "bg-white border-gray-300";

  return (
    <div
      className={`border-l-4 p-3 mb-2 rounded shadow-sm ${highlightClass}`}
      role="listitem"
    >
      <p className="text-sm text-gray-600">{new Date(timestamp).toLocaleString()}</p>
      <p className="font-semibold">{message}</p>
    </div>
  );
}

export default LogItem;