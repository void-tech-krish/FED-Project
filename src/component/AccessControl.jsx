import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./AccessControl.css";

const COLORS = ["#8b5cf6", "#3b82f6", "#22c55e", "#9ca3af"];

export default function AccessControl({
  totalUsers = 0,
  activeUsers = 0,
  pendingRequests = 0,
  complianceScore = 0,
  children,
}) {
  const data = [
    { name: "Admin Access", value: 10 },
    { name: "Editor Access", value: 20 },
    { name: "Viewer Access", value: 40 },
    { name: "Guest", value: 15 },
  ];

  return (
    <div className="ac-container">
      <div className="ac-header">
        <h2>Hello, Admin 👋</h2>

        <div className="ac-header-right">
          <input
            type="text"
            placeholder="Search by company name"
            className="ac-search"
          />
          <div className="ac-notification">🔔</div>
        </div>
      </div>

      <div className="ac-title-row">
        <div>
          <h3>Access Control Intelligence</h3>
          <p>Track and manage system access levels and compliance.</p>
        </div>

        <div>
          <h3>Monthly Access Trends</h3>
          <p>Monitor how access patterns evolve over time.</p>
        </div>
      </div>

      <div className="ac-main-grid">
        <div className="ac-cards">
          <div className="ac-card blue">
            <span>Active Users</span>
            <h1>{activeUsers}</h1>
          </div>

          <div className="ac-card green">
            <span>Total Users</span>
            <h1>{totalUsers}</h1>
          </div>

          <div className="ac-card purple">
            <span>Pending Requests</span>
            <h1>{pendingRequests}</h1>
          </div>

          <div className="ac-card dark">
            <span>Compliance Score</span>
            <h1>{complianceScore}%</h1>
          </div>
        </div>

        <div className="ac-trend-panel">
          <h3>Access Categories</h3>

          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="ac-sync">
            Last Synced: Today
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}