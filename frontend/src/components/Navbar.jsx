import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logOut } from '../Firebase';
import './Navbar.css'; 

function Navbar() {
  const [user] = useAuthState(auth);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">28ish</Link>
      <div className="navbar__links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/insight">Insight</Link>
      </div>
      <div className="navbar__auth">
        {user ? (
          <>
            <img src={require('../assets/user.png')} alt="User Avatar" className="navbar__avatar" />
            <button onClick={logOut} className="navbar__button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar__button">Sign In</Link>
            <Link to="/register" className="navbar__button">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
