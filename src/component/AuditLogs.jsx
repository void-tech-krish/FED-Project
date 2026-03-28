import React, { useState, useMemo } from "react";
import "./AuditLogs.css";

const ITEMS_PER_PAGE = 8;

function AuditLogs({ auditLogs = [], onRefresh }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);

  /* ================= FILTER + SEARCH ================= */
  const filteredLogs = useMemo(() => {
    return auditLogs.filter((log) => {
      const matchesSearch =
        log.actor.toLowerCase().includes(search.toLowerCase()) ||
        log.event.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" ? true : log.event.toLowerCase().includes(filter.toLowerCase());

      return matchesSearch && matchesFilter;
    });
  }, [auditLogs, search, filter]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE);
  const paginatedLogs = filteredLogs.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  /* ================= STATS ================= */
  const stats = {
    total: auditLogs.length,
    login: auditLogs.filter((l) => l.event.includes("login")).length,
    logout: auditLogs.filter((l) => l.event.includes("logout")).length,
    failed: auditLogs.filter((l) => l.event.includes("Failed")).length,
  };

  /* ================= EXPORT CSV ================= */
  const exportCSV = () => {
    const headers = ["Time", "Actor", "Event"];
    const rows = auditLogs.map((log) => [
      log.timestamp,
      log.actor,
      log.event,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "audit_logs.csv");
    document.body.appendChild(link);
    link.click();
  };

  /* ================= DELETE ROW ================= */
  const handleDelete = (id) => {
    alert("Delete functionality connect to backend later");
  };

  return (
    <div className="audit-page">
      {/* Header */}
      <div className="audit-header">
        <h2>Audit Logs</h2>
        <div className="audit-actions">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option>All</option>
            <option>login</option>
            <option>logout</option>
            <option>Failed</option>
          </select>
          <button onClick={onRefresh}>Refresh</button>
          <button onClick={exportCSV}>Export CSV</button>
        </div>
      </div>

      {/* Animated Stats */}
      <div className="stats-row">
        <ProgressRing value={stats.total} max={100} color="#3b82f6" label="Total" />
        <ProgressRing value={stats.login} max={100} color="#22c55e" label="Logins" />
        <ProgressRing value={stats.logout} max={100} color="#f97316" label="Logouts" />
        <ProgressRing value={stats.failed} max={100} color="#ef4444" label="Failed" />
      </div>

      {/* Search */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search logs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="table-container">
        <div className="table-header">
          <span>Date</span>
          <span>Actor</span>
          <span>Event</span>
          <span>Actions</span>
        </div>

        {paginatedLogs.map((log) => (
          <div key={log.id} className="table-row">
            <span>{log.timestamp}</span>
            <span>{log.actor}</span>
            <span>{log.event}</span>
            <span className="row-actions">
              <button title="Lock">🔒</button>
              <button title="Delete" onClick={() => handleDelete(log.id)}>🗑</button>
              <button title="More">⋮</button>
            </span>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span>Page {page} of {totalPages || 1}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

/* ================= PROGRESS RING ================= */
function ProgressRing({ value, max, color, label }) {
  const radius = 45;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (value / max) * circumference;

  return (
    <div className="ring-card">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#eee"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{
            strokeDashoffset,
            transition: "stroke-dashoffset 1s ease",
          }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="ring-text">{value}</div>
      <p>{label}</p>
    </div>
  );
}

export default AuditLogs;