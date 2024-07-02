import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faStar, faClock, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Activity from "../Activity";
import './navigation.css';

export default function SideBar() {
  const [selected, setSelected] = useState('home');
  const [small, setSmall] = useState(true);
  const [activities, setActivities] = useState([]);
  const [showActivities, setShowActivities] = useState(false);
  const navigate = useNavigate();

  function setPage(pageName) {
    // Setting selected state to passed in page name,
    // changing current page based on page name using
    // react router dom navigate hook
    setSelected(pageName);
    switch (pageName) {
      case 'home':
        navigate('/home');
        break;
      case 'favorites':
        navigate('/favorites');
        break;
      case 'watchlater':
        navigate('/watchlater');
        break;
      default:
        console.error('No matching page found for setPage');
    }
  }

  const handleMouseEnter = () => {
    setSmall(false);
    setShowActivities(true);
  }

  const handleMouseLeave = () => {
    setSmall(true);
    setShowActivities(false);
  }

  useEffect(() => {
    // Sending get request to /api/activity to get recent
    // user activity
    const fetchActivities = async () => {
      try {
        axios.get('http://localhost:8000/api/activity')
        // Parse the respose
        .then(response => {
          if (response.status == 200) {
            return response.data;
          } else {
            throw new Error('Error fetching activity data, Status code:', response.status);
          }
        })
        // Store data in activity state
        .then(data => {
          setActivities(data);
        })
      } catch (error) {
        console.error('An error occured when fetching activity data:', error);
      }
    }
  }, [])

  return (
    <div className="sidebar-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <nav className="page-nav-element">
        <ul className={`${small && 'page-nav-small'}`}>
          <li onClick={setPage('home')}><FontAwesomeIcon icon={faFolder}></FontAwesomeIcon></li>
          <li onClick={setPage('favorites')}><FontAwesomeIcon icon={faStar}></FontAwesomeIcon></li>
          <li onClick={setPage('watchlater')}><FontAwesomeIcon icon={faClock}></FontAwesomeIcon></li>
        </ul>
        <ul className={`${!small && 'page-nav-large'}`}>
          <li onClick={setPage('home')}><FontAwesomeIcon icon={faFolder}></FontAwesomeIcon>Home {selected == 'home' && <FontAwesomeIcon icon={faArrowRight} className="arrow-right"></FontAwesomeIcon>}</li>
          <li onClick={setPage('favorites')}><FontAwesomeIcon icon={faStar}></FontAwesomeIcon>Favorites {selected == 'favorites' && <FontAwesomeIcon icon={faArrowRight} className="arrow-right"></FontAwesomeIcon>}</li>
          <li onClick={setPage('watchlater')}><FontAwesomeIcon icon={faClock}></FontAwesomeIcon>Watch Later {selected == 'watchlater' && <FontAwesomeIcon icon={faArrowRight} className="arrow-right"></FontAwesomeIcon>}</li>
        </ul>
        <div className={`activities-container ${showActivities && 'show-activities'}`}>
          <h1>Latest Activities</h1>
          <ul className="activities-list">
            {activities.map((activity, index) => (
              <Activity key={index} activity={activity} />
            ))}
          </ul>
        </div>
      </nav>
    </div>
  )
}