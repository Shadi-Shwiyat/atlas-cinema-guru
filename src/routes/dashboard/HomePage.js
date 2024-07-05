import React, { useEffect, useState } from "react";
import Filter from "../../components/movies/Filter";
import MovieCard from "../../components/movies/MovieCard.js";
import Button from "../../components/general/Button.js";
import './dashboard.css';
import axios from "axios";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [minYear, setMinYear] = useState(1970);
  const [maxYear, setMaxYear] = useState(2022);
  const [genres, setGenres] = useState([]);
  const [sort, setSort] = useState('latest');
  const [title, setTitle] = useState('');
  const [page, setPage] = useState(1);

  // Function takes a page number and loads movies from api
  // based on page number and options
  const loadMovies = (page) => {
    const accessToken = localStorage.getItem('accessToken');
    const genresString = genres.join(',');

    // Api request for advance search of movies
    const movieRequest = async () => {
      try {
        const moviesResponse = await axios.get('http://localhost:8000/api/titles/advancedsearch', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          params: {
            'minYear': minYear,
            'maxYear': maxYear,
            'genres': genresString,
            'title': title,
            'sort': sort,
            'page': page
           }
        })

        if (moviesResponse.status == 200) {
          setMovies(moviesResponse.data.titles);
          // console.log('Successfully retrieved movies! Movie data:', moviesResponse.data.titles);
        }
      } catch (error) {
        console.error('There was an error searching for movies', error);
      }
    }

    movieRequest();
  }

  useEffect(() => {
    // console.log(`Page: ${page}, Min Year: ${minYear}, Max Year: ${maxYear}, Genres: ${genres}, Title: ${title}, Sort: ${sort}`);
    loadMovies(page);
  }, [minYear, maxYear, genres, title, sort, page])

  const handleNextPage = (e) => {
    e.preventDefault();
    setPage(page + 1);
  }

  const handleResetPage = (e) => {
    e.preventDefault();
    setMinYear(1970);
    setMaxYear(2022);
    setGenres([]);
    setTitle('');
    setSort('');
    setPage(1);
  }

  return (
    <div className="homepage-container">
      <Filter
        minYear={minYear}
        setMinYear={setMinYear}
        maxYear={maxYear}
        setMaxYear={setMaxYear}
        sort={sort}
        setSort={setSort}
        genres={genres}
        setGenres={setGenres}
        title={title}
        setTitle={setTitle}
      />
      <div className="movies-container">
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            movie={movie}
          />
        ))}
      </div>
      <div className="page-button-container">
        <Button
          label='Load More...'
          className='load-more-button load-button'
          onClick={handleNextPage}
        />
        <Button
          label='Reset Search'
          className='Reset-page-button load-button'
          onClick={handleResetPage}
        />
      </div>
    </div>
  )
}
