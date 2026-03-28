import React from "react";

function AdminPanel({ submissions = [], onApprove, onReject }) {
  return (
    <div className="admin-panel h-full w-full animate-fadeIn">
      <h1 className="text-3xl font-extrabold mb-6 text-center">
        Admin Panel - Audit Streams
      </h1>
      <div className="card">
        <table className="activity-table" style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>User</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.length > 0 ? (
              submissions.map((sub) => (
                <tr key={sub.id}>
                  <td>{sub.name}</td>
                  <td className={`status ${sub.status}`}>{sub.status}</td>
                  <td>
                    {sub.status === 'pending' && (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => onApprove(sub.id)} style={{ padding: '4px 8px', cursor: 'pointer', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>Approve</button>
                        <button onClick={() => onReject(sub.id)} style={{ padding: '4px 8px', cursor: 'pointer', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}>Reject</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center' }}>No submissions</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanel;
