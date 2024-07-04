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
        if(favoriteResponse.status === 200) {
          for(const favoriteMovie of favoriteResponse.data) {
            if(favoriteMovie.title == movie.title) {
              setIsFavorite(true);
              break;
            }
          }
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
        if(watchlaterResponse.status === 200) {
          for(const watchlaterMovie of watchlaterResponse.data) {
            if(watchlaterMovie.title == movie.title) {
              setIsWatchLater(true);
              break;
            }
          }
        } else {
          throw new Error(`Error fetching watch later data, Status code: ${watchlaterResponse.status}`);
        }
      } catch (error) {
        console.error('There was an error fetching favorites or watch later history', error);
      }
    }

    checkMovieStatus();
  }, [movie])

  return (
    <div className="movie-card-container">
      <li>
        <div className="card-thumbnail-container">
          <FontAwesomeIcon icon={faClock} className={isWatchLater ? 'watch-later' : ''}></FontAwesomeIcon>
          <FontAwesomeIcon icon={faStar} className={isFavorite ? 'favorite' : ''}></FontAwesomeIcon>
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