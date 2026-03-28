import React, { useState } from "react";
import "./ClientForm.css";

function ClientForm({ onSubmit }) {
  const [clients, setClients] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    service: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newClient = {
      id: Date.now(),
      name: formData.fullName,
      status: "pending",
      ...formData,
      created: new Date().toLocaleDateString(),
    };

    setClients([newClient, ...clients]);

    if (onSubmit) onSubmit(newClient);

    setFormData({
      fullName: "",
      phone: "",
      email: "",
      service: "",
    });
  };

  return (
    <div className="client-page">
      <div className="top-bar">
        <h2>My Forms</h2>
        <button className="calendar-btn" onClick={() => setShowCalendar(true)}>
          📅
        </button>
      </div>

      {/* FORM CARD */}
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <label htmlFor="fullName" className="sr-only" aria-label="Full Name">Full Name</label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            aria-required="true"
          />
          <label htmlFor="phone" className="sr-only">Phone Number</label>
          <input
            id="phone"
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            aria-required="true"
          />
          <label htmlFor="email" className="sr-only">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            aria-required="true"
          />
          <label htmlFor="service" className="sr-only">Select Service</label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            aria-required="true"
          >
            <option value="">Select Service</option>
            <option>DUI</option>
            <option>Divorce</option>
            <option>Corporate</option>
            <option>Immigration</option>
          </select>

          <button type="submit" aria-label="Submit Form">Add Form</button>
        </form>
      </div>

      {/* CLIENT CARDS */}
      <div className="cards-container">
        {clients.map((client) => (
          <div key={client.id} className="client-card">
            <div className="left-border"></div>

            <div className="avatar">
              {client.fullName.charAt(0).toUpperCase()}
            </div>

            <div className="card-info">
              <h3>{client.fullName}</h3>
              <p>Created: {client.created}</p>
              <p>Phone: {client.phone}</p>
              <p>Email: {client.email}</p>
            </div>

            <button className="send-btn">Send</button>
          </div>
        ))}
      </div>

      {/* CALENDAR MODAL */}
      {showCalendar && (
        <div className="modal-overlay" onClick={() => setShowCalendar(false)}>
          <div className="calendar-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Select Date</h3>
            <input type="date" />
            <button onClick={() => setShowCalendar(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientForm;