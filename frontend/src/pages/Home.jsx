import React, { useEffect, useState } from "react";
import { auth, db, logOut } from "../Firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Home.css";

function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/");
    fetchUserName();
  }, [user, loading]);

  return (
    <div className="home">
      <div className="home_box">
        <h1>Welcome to 28ish, {name ? name : "Guest"}</h1>
        <p>Your personal period tracking assistant.</p>
        <div className="button-group">
          {!user ? (
            <>
              <button onClick={() => navigate('/login')}>Login</button>
              <button onClick={() => navigate('/register')}>Register</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
              <button onClick={() => logOut()}>Log Out</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
