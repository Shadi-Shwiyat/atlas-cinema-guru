import React, { useEffect, useState } from "react";
import MovieCard from "../../components/movies/MovieCard.js";
import './dashboard.css';
import axios from "axios";

export default function Favorites({
  clickToggle, 
  setClickToggle
}) {
  const [movies, setMovies] = useState([]);

  const getFavorites = async () => {
    const accessToken = localStorage.getItem('accessToken');

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
        setMovies(favoriteResponse.data);
        // console.log('Successfully retrieved favorite movies!');
      } else {
        throw new Error(`Error fetching favorites data, Status code: ${favoriteResponse.status}`);
      }
    } catch (error) {
      console.error('There was an error fetching favorites in Favorites.js', error);
    }
  }

  useEffect(() => {
    getFavorites();
  }, [])

  useEffect(() => {
    getFavorites();
  }, [clickToggle])

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">MOVIES YOU LIKE</h1>
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