import React, { useState } from "react";
import Filter from "../../components/movies/Filter";
import './dashboard.css';

export default function HomePage() {
  const [genres, setGenres] = useState([]);

  return (
    <div className="homepage-container">
      <Filter
        genres={genres}
        setGenres={setGenres}
      />
    </div>
  )
}
