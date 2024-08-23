import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/GenresList.css';

const GenresList = ({ onGenreSelect }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await axios.get('http://localhost:8080/bookstore/genres');
      const sortedGenres = response.data.sort((a, b) => a.name.localeCompare(b.name));
      setGenres(sortedGenres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  return (
    <div className="genres-list">
      <h2>Genres List</h2>
      <div className="genres-grid">
        {genres.map(genre => (
          <div key={genre.id} className="genre-item">
            <Link to={`/genres/${genre.id}`}>
              <h3>{genre.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenresList;
