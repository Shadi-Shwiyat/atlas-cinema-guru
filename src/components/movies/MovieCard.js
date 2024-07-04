import React, { useEffect, useState } from "react";
import './movies.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

export default function MovieCard({
  movie,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);
  
  useEffect(() => {
    const checkMovieStatus = async () => {
      const accessToken = localStorage.getItem('accessToken');

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
          console.log('Successfully retrieved favorite movies!');
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
          console.log('Successfully retrieved watch later movies!');
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

      if (type == 'favorite') {
        if(isFavorite) {
          await axios.delete('http://localhost:8000/api/titles/favorite', {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            data: { 'imdbId': movie.imdbId }
          })
          setIsFavorite(false);
          console.log('Successfully deleted favorite movie!');
        } else {
          await axios.post('http://localhost:8000/api/titles/favorite', {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            data: { 'imdbId': movie.imdbId }
          })
          setIsFavorite(true);
          console.log('Successfully added favorite movie!');
        }
      } else if (type == 'watchlater') {
        if(isWatchLater) {
          await axios.delete('http://localhost:8000/api/titles/watchlater', {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            data: { 'imdbId': movie.imdbId }
          })
          setIsWatchLater(false);
          console.log('Successfully deleted watch later movie!');
        } else {
          await axios.post('http://localhost:8000/api/titles/watchlater', {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            data: { 'imdbId': movie.imdbId }
          })
          setIsWatchLater(true);
          console.log('Successfully added watch later movie!');
        }
      }
    } catch (error) {
      console.error('There was an error adding or removing favorites or watch later history', error);
    }
  }

  return (
    <div className="movie-card-container">
      <li>
        <div className="card-thumbnail-container">
          <FontAwesomeIcon icon={faClock} className={isWatchLater ? 'watch-later' : ''} onClick={() => handleClick('favorite')}></FontAwesomeIcon>
          <FontAwesomeIcon icon={faStar} className={isFavorite ? 'favorite' : ''} onClick={() => handleClick('watchlater')}></FontAwesomeIcon>
          <img className="card-thumbnail" src={movie.imageurls} alt={`${movie.title} thumbnail`}></img>
          <h1 className="card-title">{movie.title}</h1>
        </div>
        <div className="card-info-container">
          <p className="card-description">{movie.synopsis}</p>
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