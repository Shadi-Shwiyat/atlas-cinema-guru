import React, { useEffect, useState } from "react";
import './movies.css';

export default function Tag({
  genre,
  filter,
  genres,
  setGenres,
}) {
  const [selected, setSelected] = useState(false);

  function handleTag() {
    if (selected) {
      setGenres(genres.filter(genreToStay => genreToStay !== genre));
      setSelected(false);
    } else {
      setGenres([...genres, genre]);
      setSelected(true);
    }
  }

  // useEffect(() => {
  //   console.log('Updated genre array:', genres);
  // }, [genres])

  return (
    <li className={`tag-li-element ${selected ? 'selected' : ''}`} onClick={handleTag}>
      {genre}
    </li>
  )
}
