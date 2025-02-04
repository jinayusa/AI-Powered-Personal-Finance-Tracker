import React from "react";
import { FaWallet } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ userId, setUserId }) => {
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    setUserId(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <FaWallet />
      <Link to="/">Personal Finance Tracker</Link>
      {userId ? (
        <button onClick={handleLogout} className="button">Logout</button>
      ) : (
        <>
          <Link to="/login" className="button">Login</Link>
          <Link to="/register" className="button">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;