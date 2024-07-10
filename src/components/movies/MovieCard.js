import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock as faClockRegular, faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faClock as faClockSolid, faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import unavailable from '../../assets/unavailable.png';
import axios from "axios";
import './movies.css';

export default function MovieCard({
  movie,
  clickToggle,
  setClickToggle,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);
  const [imgSrc, setImgSrc] = useState(movie.imageurls);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    setImgSrc(movie.imageurls);
    // console.log(`${movie.title} was released: ${movie.released}`);

    const checkMovieStatus = async () => {
      const accessToken = localStorage.getItem('accessToken');
      // console.log(movie.imdbId);

      // Fetch users favorite and watch later movie history
      try {
        // Fetch users favorited movies
        const favoriteResponse = await axios.get('http://localhost:8000/api/titles/favorite', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })

        // Check response is 200(ok) and if current movie is in
        // response data's favorites, set isFavorite to true
        if (favoriteResponse.status === 200) {
          for (const favoriteMovie of favoriteResponse.data) {
            if (favoriteMovie.title == movie.title) {
              setIsFavorite(true);
              break;
            }
          }
          // console.log('Successfully retrieved favorite movies!');
        } else {
          throw new Error(`Error fetching favorites data, Status code: ${favoriteResponse.status}`);
        }

        // Fetch users watch later movies
        const watchlaterResponse = await axios.get('http://localhost:8000/api/titles/watchlater', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })

        // Check response is 200(ok) and if current movie is in
        // response data's watch later, set isWatchLater to true
        if (watchlaterResponse.status === 200) {
          for (const watchlaterMovie of watchlaterResponse.data) {
            if (watchlaterMovie.title == movie.title) {
              setIsWatchLater(true);
              break;
            }
          }
          // console.log('Successfully retrieved watch later movies!');
        } else {
          throw new Error(`Error fetching watch later data, Status code: ${watchlaterResponse.status}`);
        }
      } catch (error) {
        console.error('There was an error fetching favorites or watch later history', error);
      }
    }

    checkMovieStatus();
  }, [movie])

  const handleClick = async (type) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      // console.log('Access token is:', accessToken);

      if (type == 'favorite') {
        if(isFavorite) {
          await axios.delete(`http://localhost:8000/api/titles/favorite/${movie.imdbId}`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          })
          setIsFavorite(false);
          console.log('Successfully deleted favorite movie!');
        } else {
          // console.log('Imbd id is:', movie.imdbId);
          await axios.post(`http://localhost:8000/api/titles/favorite/${movie.imdbId}`, {}, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          })
          setIsFavorite(true);
          console.log('Successfully added favorite movie!');
        }
      } else if (type == 'watchlater') {
        if(isWatchLater) {
          await axios.delete(`http://localhost:8000/api/titles/watchlater/${movie.imdbId}`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          })
          setIsWatchLater(false);
          console.log('Successfully deleted watch later movie!');
        } else {
          await axios.post(`http://localhost:8000/api/titles/watchlater/${movie.imdbId}`, {}, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          })
          setIsWatchLater(true);
          console.log('Successfully added watch later movie!');
        }
      }

      // Toggle click to refresh favorite and watch later movies
      setClickToggle(prev => !prev);
    } catch (error) {
      console.error('There was an error adding or removing favorites or watch later history', error);
    }
  }

  const handleError = () => {
    setError(true);
    setImgSrc(unavailable);
  }

  const formatTitle = (title) => {
    if (title.length >= 25) {
      return title.substring(0, 23) + '...';
    } else {
      return title;
    }
  }

  const formatSynopsis = (synopsis) => {
    if (synopsis && synopsis.length >= 123) {
      return synopsis.substring(0, 123) + '...';
    } else {
      return synopsis;
    }
  }

  return (
    <div className="movie-card-container">
      <li>
        <div className="card-thumbnail-container">
          <FontAwesomeIcon icon={isWatchLater ? faClockSolid : faClockRegular} className={`watch-later-icon`} onClick={() => handleClick('watchlater')}></FontAwesomeIcon>
          <FontAwesomeIcon icon={isFavorite ? faStarSolid : faStarRegular} className={`favorite-icon`} onClick={() => handleClick('favorite')}></FontAwesomeIcon>
          <img className={`card-thumbnail ${error ? 'error-thumbnail' : ''}`} src={imgSrc} alt={`${movie.title} thumbnail`} onError={handleError}></img>
          <h1 className="card-title">{formatTitle(movie.title)}</h1>
        </div>
        <div className="card-info-container">
          <p className="card-description">{formatSynopsis(movie.synopsis)}</p>
          <div className="card-genres-container">
            {movie.genres.map((genre, index) => (
              <p key={index} className="card-genre">{genre}</p>
            ))}
          </div>
        </div>
      </li>
    </div>
  )
}