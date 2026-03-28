import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  NavLink,
  useLocation,
  Navigate
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

import Dashboard from "./component/Dashboard";
import Errors from "./component/Errors";
import Alerts from "./component/Alerts";
import Login from "./component/Login";
import UserManagement from "./component/UserManagement";
import ClientForm from "./component/ClientForm";
import AuditLogs from "./component/AuditLogs";
import Profile from "./component/Profile";
import AccessControl from "./component/AccessControl";
import { apiService } from "./api/mockService";

/* =======================
   Animated Routes Component
======================= */
function AnimatedRoutes({ currentUser, submissions, logs, handleClientSubmit, handleApprove, handleReject, auditLogs, refreshAuditLogs }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Routes location={location}>
          {currentUser.role === 'admin' && (
            <>
              <Route path="/" element={<Dashboard submissions={submissions} logs={logs} />} />
              <Route path="/errors" element={<Errors logs={logs} />} />
              <Route path="/alerts" element={<Alerts logs={logs} />} />
              <Route path="/users" element={<UserManagement />} />
              <Route
                path="/admin"
                element={
                  <AccessControl
                    totalUsers={120}
                    activeUsers={85}
                    pendingRequests={14}
                    complianceScore={92}
                  />
                }
              />
              <Route path="/audit" element={<AuditLogs auditLogs={auditLogs} onRefresh={refreshAuditLogs} />} />
            </>
          )}

          {currentUser.role === 'user' && (
            <Route path="/client" element={<ClientForm onSubmit={handleClientSubmit} />} />
          )}

          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to={currentUser.role === 'admin' ? '/' : '/client'} />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

/* =======================
   Main App Component
======================= */
function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const [logs, setLogs] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Fetch Async Data when User Logs In
  useEffect(() => {
    if (currentUser) {
      loadData();
    }
  }, [currentUser]);

  const loadData = async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const [fetchedLogs, fetchedSubs] = await Promise.all([
        apiService.getLogs(),
        apiService.getSubmissions(),
      ]);
      setLogs(fetchedLogs);
      setSubmissions(fetchedSubs);
    } catch (err) {
      setApiError(err.message);
      // fallback in case of strict error
      setLogs([]);
      setSubmissions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Random audit logs generator
  const randomNames = ["Alice", "Bob", "Charlie", "Diana", "Ethan", "Fiona"];
  const events = ["post.delete", "post.create", "user.login", "user.logout"];
  const targetsList = [
    ["user", "team", "post"],
    ["user", "team"],
    ["user"],
    ["team", "post"],
  ];

  const generateAuditLogs = (count = 10) => {
    const logs = [];
    for (let i = 0; i < count; i++) {
      const actor = randomNames[Math.floor(Math.random() * randomNames.length)];
      const event = events[Math.floor(Math.random() * events.length)];
      const targets = targetsList[Math.floor(Math.random() * targetsList.length)];
      const timestamp = new Date().toLocaleString();
      logs.push({
        id: i + 1,
        actor,
        event,
        targets,
        timestamp,
      });
    }
    return logs;
  };

  const [auditLogs, setAuditLogs] = useState(generateAuditLogs(12));
  const refreshAuditLogs = () => setAuditLogs(generateAuditLogs(12));

  const handleClientSubmit = async (entry) => {
    const newEntry = await apiService.createSubmission(entry);
    setSubmissions((prev) => [newEntry, ...prev]);
  };

  const handleApprove = async (id) => {
    const updated = await apiService.updateSubmissionStatus(id, "approved");
    setSubmissions((prev) => prev.map((s) => (s.id === id ? updated : s)));
    setLogs((prev) => [
      { id: Date.now(), type: "info", message: `Submission ${id} approved`, timestamp: new Date().toLocaleDateString() },
      ...prev
    ]);
  };

  const handleReject = async (id) => {
    const updated = await apiService.updateSubmissionStatus(id, "rejected");
    setSubmissions((prev) => prev.map((s) => (s.id === id ? updated : s)));
  };

  if (!currentUser) {
    return (
      <div className="login-wrapper">
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* ===== NAVBAR ===== */}
      <header className="navbar glass">
        <h1 className="logo">Setup & Management</h1>

        <div className="nav-right">
          {/* Notifications */}
          <div className="dropdown-wrapper">
            <button
              className="icon-btn"
              onClick={() => {
                setShowNotif(!showNotif);
                setShowProfile(false);
              }}
            >
              🔔
            </button>

            {showNotif && (
              <div className="dropdown">
                <p>New user registered</p>
                <p>System update completed</p>
                <p>No critical alerts</p>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="dropdown-wrapper">
            <button
              className="icon-btn"
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotif(false);
              }}
            >
              👤
            </button>

            {showProfile && (
              <div className="dropdown">
                <NavLink to="/profile" className="block dropdown-item" onClick={() => setShowProfile(false)}>
                  My Profile
                </NavLink>
                <div className="dropdown-divider"></div>
                <div 
                  className="dropdown-item text-danger" 
                  onClick={() => { setShowProfile(false); handleLogout(); }}
                  style={{ cursor: 'pointer', marginTop: '8px' }}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ===== MAIN LAYOUT ===== */}
      <div className="main-layout">
        {/* ===== SIDEBAR ===== */}
        <aside className={`sidebar glass ${collapsed ? "collapsed" : ""}`}>
          <div className="sidebar-header">
            <h2>{currentUser.role === 'admin' ? 'Setup & Mgmt' : 'My Portal'}</h2>
            <button
              className="collapse-btn"
              onClick={() => setCollapsed(!collapsed)}
            >
              ☰
            </button>
          </div>

          {currentUser.role === 'admin' && (
            <>
              <NavLink to="/" end className="side-link">🏠 Dashboard</NavLink>
              <NavLink to="/users" className="side-link">User Management</NavLink>
              <NavLink to="/admin" className="side-link">Access Control</NavLink>
              <NavLink to="/audit" className="side-link">Audit Logs</NavLink>
            </>
          )}

          {currentUser.role === 'user' && (
            <NavLink to="/client" className="side-link">Client Form</NavLink>
          )}

        </aside>

        {/* ===== CONTENT ===== */}
        <main className="content glass" style={{ position: 'relative' }}>
          {isLoading && (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255,255,255,0.8)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <h2 style={{ color: '#333' }}>Loading Data...</h2>
            </div>
          )}
          {apiError && !isLoading && (
            <div style={{ padding: '20px', background: '#fee2e2', color: '#dc2626', borderRadius: '8px', margin: '20px', textAlign: 'center' }}>
              <strong>API Error:</strong> {apiError}
              <button onClick={loadData} style={{display: 'block', margin: '10px auto', padding: '8px 16px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px'}}>Retry</button>
            </div>
          )}
          
          <AnimatedRoutes
            currentUser={currentUser}
            submissions={submissions}
            logs={logs}
            handleClientSubmit={handleClientSubmit}
            handleApprove={handleApprove}
            handleReject={handleReject}
            auditLogs={auditLogs}
            refreshAuditLogs={refreshAuditLogs}
          />
        </main>
      </div>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#1e293b",
            color: "#fff",
            borderRadius: "10px",
          },
        }}
      />

      {/* ===== FOOTER ===== */}
      <footer className="footer glass">
        © 2026 Activity Log Dashboard
      </footer>
    </div>
  );
}

export default App;