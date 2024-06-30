import React from 'react';
import './general.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar({
  title,
  setTitle,
}) {
  const handleInput = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  }

  return (
    <div className='search-bar-container'>
      <FontAwesomeIcon icon={faSearch} className='search-icon'></FontAwesomeIcon>
      <input
      type='text'
      className='search-bar'
      value={title}
      placeholder='Search Movies'
      onChange={handleInput}
      >
      </input>
    </div>
  )
}
