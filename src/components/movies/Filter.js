import React from "react";
import SearchBar from '../general/SearchBar.js';
import Input from "../general/Input";
import SelectInput from '../general/SelectInput.js';
import Tag from "../../components/movies/Tag";
import './movies.css';

export default function Filter({
  minYear,
  setMinYear,
  maxYear,
  setMaxYear,
  sort,
  setSort,
  genres,
  setGenres,
  title,
  setTitle,
}) {
  const genreArray = ['Action', 'Drama', 'Comedy', 'Biography',
    'Romance', 'Thriller', 'War', 'History', 'Sport', 'Sci-fi',
  'Documentary', 'Crime', 'Fantasy']

  const options = [
    {value: 'latest', label: 'Latest'},
    {value: 'oldest', label: 'Oldest'},
    {value: 'highestrated', label: 'Highest Rated'},
    {value: 'lowestrated', label: 'Lowest Rated'},
  ]

  return (
    <div className="filter-container">
      <div className="inputs-container">
        <SearchBar title={title} setTitle={setTitle} />
        <div className="year-sort-container">
          <Input
            label='Min Date:'
            type='number'
            className='min-year-input'
            value={minYear}
            setValue={setMinYear}
          />
          <Input
            label='Max Date:'
            type='number'
            className='max-year-input'
            value={maxYear}
            setValue={setMaxYear}
          />
          <SelectInput
            label='Sort:'
            options={options}
            className='sort-input'
            value={sort}
            setValue={setSort}
          />
        </div>
      </div>
      <div className="tags-container">
        {genreArray.map((genre, index) => (
          <Tag key={index} genre={genre} genres={genres} setGenres={setGenres} />
        ))}
      </div>
    </div>
  )
}