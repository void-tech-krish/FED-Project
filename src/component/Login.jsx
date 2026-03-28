import React, { useState } from "react";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [loginRole, setLoginRole] = useState('user');

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  // Basic validation
  const validate = () => {
    let newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.includes("@")) {
      newErrors.email = "Enter a valid email";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Simulated authentication
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (loginRole === 'admin') {
        if (formData.email === "admin@mail.com" && formData.password === "123456") {
          if (onLogin) onLogin({ role: 'admin', name: formData.firstName || 'Admin', email: formData.email });
        } else {
          setErrors({ auth: "Invalid admin credentials (try admin@mail.com / 123456)" });
        }
      } else {
        if (formData.email === "user@mail.com" && formData.password === "123456") {
          if (onLogin) onLogin({ role: 'user', name: formData.firstName || 'User', email: formData.email });
        } else {
          setErrors({ auth: "Invalid user credentials (try user@mail.com / 123456)" });
        }
      }
    }
  };

  return (
    <div className="account-container">
      <div className="main-content fade-in">

        <>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
            <button 
              type="button"
              className="btn-primary" 
              onClick={() => setLoginRole('user')}
              style={{ padding: '8px 16px', background: loginRole === 'user' ? '#3b82f6' : '#94a3b8', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer' }}
            >
              User Login
            </button>
            <button 
              type="button"
              className="btn-primary" 
              onClick={() => setLoginRole('admin')}
              style={{ padding: '8px 16px', background: loginRole === 'admin' ? '#3b82f6' : '#94a3b8', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer' }}
            >
              Admin Login
            </button>
          </div>

          <div className="profile-header">
            <img
              src={
                profilePic ||
                "https://i.pravatar.cc/100?img=12"
              }
              alt="profile"
              className="profile-img"
            />

            <label className="upload-btn">
              Upload new picture
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                hidden
              />
            </label>
          </div>

          <form onSubmit={handleSubmit}>
            <h3>Full Name</h3>
            <div className="form-row">
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <p className="error">{errors.firstName}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <p className="error">{errors.lastName}</p>
                )}
              </div>
            </div>

            <h3>Email</h3>
            <input
              type="email"
              name="email"
              placeholder={loginRole === 'admin' ? "admin@mail.com" : "user@mail.com"}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <h3>Password</h3>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="123456"
                onChange={handleChange}
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            {errors.password && <p className="error">{errors.password}</p>}
            {errors.auth && <p className="error" style={{marginTop: '10px', textAlign: 'center', background: '#fee2e2', padding: '10px', borderRadius: '4px'}}>{errors.auth}</p>}

            <button type="submit" className="btn-primary">
              Login as {loginRole === 'admin' ? 'Admin' : 'User'}
            </button>
          </form>
        </>
      </div>
    </div>
  );
};

export default Login;