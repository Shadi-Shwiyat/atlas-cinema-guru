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
    // Setting selected state to passed in page name
    setSelected(pageName);
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
    // Check is a page is selected and the routes
    // the router to the selected page, must use
    // navigate in useEffect to avoid errors
    if (selected) {
      switch (selected) {
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
  }, [selected, navigate])

  useEffect(() => {
    // Sending get request to /api/activity to get recent
    // user activity
    const fetchActivities = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');

        // Send access token for user to fetch activities
        const response = await axios.get('http://localhost:8000/api/activity', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        // Check is response is ok and save it into activities state array
        if (response.status === 200) {
          setActivities(response.data.slice(0, 10));
          // console.log('Activities retrieved successfully!', activities);
        } else {
          throw new Error(`Error fetching activity data, Status code: ${response.status}`);
        }
      } catch (error) {
        console.error('An error occured when fetching activity data:', error);
      }
    }

    fetchActivities();
  }, [])

  return (
    <div className={`sidebar-container ${small ? 'sidebar-small' : 'sidebar-large'}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <nav className="page-nav-element">
        <ul className={`${small ? 'page-nav-small' : 'hide-page-nav-small'}`}>
          <li onClick={() => setPage('home')} className={selected == 'home' ?  'selected' : ''}><FontAwesomeIcon icon={faFolder}></FontAwesomeIcon></li>
          <li onClick={() => setPage('favorites')} className={selected == 'favorites' ?  'selected' : ''}><FontAwesomeIcon icon={faStar}></FontAwesomeIcon></li>
          <li onClick={() => setPage('watchlater')} className={selected == 'watchlater' ?  'selected' : ''}><FontAwesomeIcon icon={faClock}></FontAwesomeIcon></li>
        </ul>
        <ul className={`${!small ? 'page-nav-large' : 'hide-page-nav-large'}`}>
          <li onClick={() => setPage('home')} className={selected == 'home' ?  'selected' : ''}><FontAwesomeIcon icon={faFolder} className="nav-icons"></FontAwesomeIcon> Home {selected == 'home' && <FontAwesomeIcon icon={faArrowRight} className="arrow-right"></FontAwesomeIcon>}</li>
          <li onClick={() => setPage('favorites')} className={selected == 'favorites' ?  'selected' : ''}><FontAwesomeIcon icon={faStar} className="nav-icons"></FontAwesomeIcon> Favorites {selected == 'favorites' && <FontAwesomeIcon icon={faArrowRight} className="arrow-right"></FontAwesomeIcon>}</li>
          <li onClick={() => setPage('watchlater')} className={selected == 'watchlater' ?  'selected' : ''}><FontAwesomeIcon icon={faClock} className="nav-icons"></FontAwesomeIcon> Watch Later {selected == 'watchlater' && <FontAwesomeIcon icon={faArrowRight} className="arrow-right"></FontAwesomeIcon>}</li>
        </ul>
        <div className={`activities-container ${showActivities ? 'show-activities' : 'hide-activities'}`}>
          <h3>Latest Activities</h3>
          <span></span>
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