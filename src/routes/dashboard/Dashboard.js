import React from "react";
import Header from "../../components/navigation/Header";
import './dashboard.css';

export default function Dashboard({
  userUsername,
  setIsLoggedIn,
}) {
  return (
    <div className="dashboard-container">
      <Header
        userUsername={userUsername}
        setIsLoggedIn={setIsLoggedIn}
      />
    </div>
  )
}