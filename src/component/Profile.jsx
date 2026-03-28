import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  memo,
} from "react";
import "./Profile.css";

/* ----------------- Memoized Subcomponents ----------------- */

const AvatarSection = memo(({ avatar, onUpload }) => {
  return (
    <div className="avatar-section">
      <img
        src={avatar || "https://i.pravatar.cc/120?img=5"}
        alt="avatar"
        className="avatar-img"
      />
      <label className="upload-btn">
        Upload Avatar
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={onUpload}
        />
      </label>
    </div>
  );
});

const UserInfo = memo(({ user }) => {
  if (!user) return null;

  return (
    <div className="info-box">
      <input type="text" value={user.name} readOnly />
      <input type="email" value={user.email} readOnly />
      <input type="text" value={user.role} readOnly />
    </div>
  );
});

/* ----------------- Main Component ----------------- */

const Profile = () => {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const [passwordData, setPasswordData] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const [status, setStatus] = useState({
    loading: true,
    error: null,
  });

  const [message, setMessage] = useState("");

  /* ----------------- Predictable Side Effect ----------------- */

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        setStatus({ loading: true, error: null });

        // Simulated API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockUser = {
          name: "Admin User",
          email: "admin@example.com",
          role: "System Administrator",
        };

        if (isMounted) {
          setUser(mockUser);
          setStatus({ loading: false, error: null });
        }
      } catch (err) {
        if (isMounted) {
          setStatus({ loading: false, error: "Failed to load user data" });
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, []);

  /* ----------------- Handlers (Memoized) ----------------- */

  const handleAvatarUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  }, []);

  const handlePasswordChange = useCallback((e) => {
    setPasswordData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleUpdatePassword = useCallback(() => {
    if (!passwordData.current || !passwordData.newPass || !passwordData.confirm) {
      setMessage("All fields are required");
      return;
    }

    if (passwordData.newPass.length < 6) {
      setMessage("New password must be at least 6 characters");
      return;
    }

    if (passwordData.newPass !== passwordData.confirm) {
      setMessage("Passwords do not match");
      return;
    }

    setMessage("Password updated successfully ✅");
    setPasswordData({ current: "", newPass: "", confirm: "" });
  }, [passwordData]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  /* ----------------- Memoized Derived State ----------------- */

  const isEmpty = useMemo(() => {
    return !status.loading && !status.error && !user;
  }, [status, user]);

  /* ----------------- Render States ----------------- */

  if (status.loading) {
    return (
      <div className="profile-container center">
        <div className="loader"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (status.error) {
    return (
      <div className="profile-container center">
        <p className="error">{status.error}</p>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="profile-container center">
        <p>No user data available.</p>
      </div>
    );
  }

  /* ----------------- Main Render ----------------- */

  return (
    <div className={`profile-wrapper ${darkMode ? "dark" : ""}`}>
      <div className="profile-container fade-in">
        <div className="profile-card">
          <h2>My Profile</h2>

          <button className="dark-toggle" onClick={toggleDarkMode}>
            {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
          </button>

          <AvatarSection avatar={avatar} onUpload={handleAvatarUpload} />

          <UserInfo user={user} />

          <div className="btn-group">
            <button className="btn-secondary">Edit Profile</button>
            <button className="btn-danger">Logout</button>
          </div>

          <h3>Change Password</h3>

          <div className="password-section">
            <input
              type="password"
              name="current"
              placeholder="Current Password"
              value={passwordData.current}
              onChange={handlePasswordChange}
            />
            <input
              type="password"
              name="newPass"
              placeholder="New Password"
              value={passwordData.newPass}
              onChange={handlePasswordChange}
            />
            <input
              type="password"
              name="confirm"
              placeholder="Confirm Password"
              value={passwordData.confirm}
              onChange={handlePasswordChange}
            />

            {message && <p className="message">{message}</p>}

            <button className="btn-primary" onClick={handleUpdatePassword}>
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;