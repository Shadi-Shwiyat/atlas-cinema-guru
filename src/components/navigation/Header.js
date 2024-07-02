import React from "react";
import './navigation.css';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header({
  userUsername,
  setIsLoggedIn,
}) {
  // Function removes accessToken from local storage,
  // Sets is logged in to false, effectively logging
  // user out
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  }

  return (
    <nav className="header-nav">
      <h3>Cinema Guru</h3>
      <div className="header-user-container">
        <img src="https://picsum.photos/100/100"></img>
        <p>Welcome, {userUsername}! <span onClick={logout}><FontAwesomeIcon icon={faArrowRightFromBracket} className="logout-icon"></FontAwesomeIcon> Logout</span></p>
      </div>
    </nav>
  )
}
