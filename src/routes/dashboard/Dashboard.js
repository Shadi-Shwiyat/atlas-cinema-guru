import React, { useState } from "react";
import Header from "../../components/navigation/Header";
import SideBar from "../../components/navigation/SideBar";
import HomePage from "./HomePage";
import Favorites from "./Favorites";
import WatchLater from "./WatchLater";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './dashboard.css';

export default function Dashboard({
  userUsername,
  setIsLoggedIn,
}) {
  const [clickToggle, setClickToggle] = useState(false);

  return (
    <BrowserRouter>
      <div className="dashboard-container">
        <Header
          userUsername={userUsername}
          setIsLoggedIn={setIsLoggedIn}
        />
        <SideBar
          clickToggle={clickToggle}
          setClickToggle={setClickToggle}
        />
      </div>
      <Routes>
        <Route path="/home" element={<HomePage clickToggle={clickToggle} setClickToggle={setClickToggle} />}></Route>
        <Route path="/favorites" element={<Favorites clickToggle={clickToggle} setClickToggle={setClickToggle} />}></Route>
        <Route path="/watchlater" element={<WatchLater clickToggle={clickToggle} setClickToggle={setClickToggle} />}></Route>
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  )
}