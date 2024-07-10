import React, { useEffect, useState } from "react";
import MovieCard from "../../components/movies/MovieCard.js";
import './dashboard.css';
import axios from "axios";

export default function WatchLater({
  clickToggle,
  setClickToggle
}) {
  const [movies, setMovies] = useState([]);

  const getWatchLater = async () => {
    const accessToken = localStorage.getItem('accessToken');

    try {
      // Fetch users favorited movies
      const favoriteResponse = await axios.get('http://localhost:8000/api/titles/watchlater', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      // Check response is 200(ok) and if current movie is in
      // response data's favorites, set isFavorite to true
      if (favoriteResponse.status === 200) {
        setMovies(favoriteResponse.data);
        // console.log('Successfully retrieved watch later movies!');
      } else {
        throw new Error(`Error fetching watch later data, Status code: ${favoriteResponse.status}`);
      }
    } catch (error) {
      console.error('There was an error fetching watch later in WatchLater.js', error);
    }
  }

  useEffect(() => {
    getWatchLater();
  }, [])

  useEffect(() => {
    getWatchLater();
  }, [clickToggle])

  return (
    <div className="watch-later-container">
      <h1 className="watch-later-title">MOVIES TO WATCH LATER</h1>
      <span></span>
      <div className="movies-container">
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            movie={movie}
            clickToggle={clickToggle}
            setClickToggle={setClickToggle}
          />
        ))}
      </div>
    </div>
  )
}