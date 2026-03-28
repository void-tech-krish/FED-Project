import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const Dashboard = ({ submissions = [], logs = [] }) => {
  const [search, setSearch] = useState("");

  // Demo fallback data if empty
  const demoActivity = [
    { id: 1, name: "John Doe", status: "approved" },
    { id: 2, name: "Alice Smith", status: "pending" },
    { id: 3, name: "David Lee", status: "rejected" },
  ];

  const activityData =
    submissions.length > 0 ? submissions : demoActivity;

  const filtered = activityData.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Activity",
        data: [12, 19, 8, 15, 22, 18, 30],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="dashboard">

      {/* ===== STATS ===== */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>124</p>
        </div>
        <div className="stat-card">
          <h3>Errors</h3>
          <p>{logs.length}</p>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <p>{activityData.filter(s => s.status === "pending").length}</p>
        </div>
      </div>

      {/* ===== CHART ===== */}
      <div className="chart-container">
        <h2>Weekly Activity</h2>
        <Line data={chartData} />
      </div>

      {/* ===== ACTIVITY TABLE ===== */}
      <div className="activity-section">
        <div className="table-header">
          <h2>Recent Activity</h2>
          <input
            type="text"
            placeholder="Search user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <table className="activity-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td className={`status ${item.status}`}>
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Dashboard;
