import React, { useState, useMemo } from "react";
import "./UserManagement.css";

export default function UserManagement() {
  const usersData = [
    {
      id: 1,
      name: "Alex Brown",
      email: "alex@brown.com",
      status: "Active",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      roles: ["Sales", "Manager"],
      rules: ["Can create tasks", "Can create reports"],
      lastVisited: "Apr 15, 2020 18:39:03",
    },
    {
      id: 2,
      name: "Sinister Alpha",
      email: "sinister12@gmail.com",
      status: "Active",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      roles: ["Support"],
      rules: ["Can view reports"],
      lastVisited: "May 01, 2020 12:11:10",
    },
    {
      id: 3,
      name: "Reno Daloni",
      email: "reno@gmail.com",
      status: "Not active",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      roles: ["Viewer"],
      rules: ["Read only access"],
      lastVisited: "Jun 20, 2020 09:20:45",
    },
  ];

  const [users, setUsers] = useState(usersData);
  const [selectedUser, setSelectedUser] = useState(usersData[0]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const USERS_PER_PAGE = 5;

  /* ---------------- FILTER ---------------- */
  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, users]);

  /* ---------------- PAGINATION ---------------- */
  const indexOfLast = currentPage * USERS_PER_PAGE;
  const indexOfFirst = indexOfLast - USERS_PER_PAGE;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  /* ---------------- ADD NEW USER ---------------- */
  const addNewUser = () => {
    const newUser = {
      id: Date.now(),
      name: "New User",
      email: "new@user.com",
      status: "Active",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      roles: ["Viewer"],
      rules: ["Basic access"],
      lastVisited: "Just now",
    };
    setUsers([newUser, ...users]);
  };

  return (
    <div className="user-manager">

      {/* LEFT PANEL */}
      <div className="users-panel">

        <div className="panel-top">
          <button className="new-btn" onClick={addNewUser}>
            + New
          </button>

          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <table className="users-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Status</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((user) => (
              <tr
                key={user.id}
                className={
                  selectedUser.id === user.id ? "active-row fade-in" : "fade-in"
                }
                onClick={() => setSelectedUser(user)}
              >
                <td className="user-name">
                  <img
                    src={user.image}
                    alt="profile"
                    className="small-avatar"
                  />
                  {user.name}
                </td>

                <td>
                  <span
                    className={
                      user.status === "Active"
                        ? "status active"
                        : "status inactive"
                    }
                  >
                    {user.status}
                  </span>
                </td>

                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          <span>
            {currentPage} / {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="details-panel">

        <div className="details-header">
          <h3>User information</h3>
          <button className="edit-icon">✏</button>
        </div>

        <div className="profile-section">
          <img
            src={selectedUser.image}
            alt="profile"
            className="large-avatar"
          />
          <h4>{selectedUser.name}</h4>
          <span
            className={
              selectedUser.status === "Active"
                ? "status active"
                : "status inactive"
            }
          >
            {selectedUser.status}
          </span>
        </div>

        <div className="info-section">
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Last visited:</strong> {selectedUser.lastVisited}</p>
        </div>

        <div className="roles-section">
          <h4>Roles</h4>
          {selectedUser.roles.map((role, index) => (
            <div key={index} className="role-item">
              {role}
            </div>
          ))}
        </div>

        <div className="rules-section">
          <h4>Rules</h4>
          {selectedUser.rules.map((rule, index) => (
            <div key={index} className="rule-item">
              {rule}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}