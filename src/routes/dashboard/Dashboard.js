import React from "react";
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
  return (
    <BrowserRouter>
      <div className="dashboard-container">
        <Header
          userUsername={userUsername}
          setIsLoggedIn={setIsLoggedIn}
        />
        <SideBar />
      </div>
      <Routes>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/favorites" element={<Favorites />}></Route>
        <Route path="/watchlater" element={<WatchLater />}></Route>
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  )
}