import React from "react";

function FilterBar({ filter, setFilter, search, setSearch }) {
  return (
    <div className="flex gap-4 mb-4 items-center">
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border p-2 rounded"
        aria-label="Filter logs by type"
      >
        <option value="all">All</option>
        <option value="error">Errors</option>
        <option value="alert">Alerts</option>
        <option value="info">Info</option>
      </select>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search logs..."
        className="border p-2 rounded flex-1"
        aria-label="Search logs"
      />
    </div>
  );
}

export default FilterBar;