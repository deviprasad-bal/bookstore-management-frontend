import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/GenresList.css';

const GenresList = ({ onGenreSelect }) => {
  const [genres, setGenres] = useState([]);
  const [groupedGenres, setGroupedGenres] = useState({});

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await axios.get('http://localhost:8080/bookstore/genres');
      const sortedGenres = response.data.sort((a, b) => a.name.localeCompare(b.name));
      setGenres(sortedGenres);
      groupGenresByInitial(sortedGenres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const groupGenresByInitial = (genres) => {
    const grouped = genres.reduce((acc, genre) => {
      const firstLetter = genre.name.charAt(0).toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(genre);
      return acc;
    }, {});
    setGroupedGenres(grouped);
  };

  return (
    <div className="genres-list">
      <h2>Genres List</h2>
      <div className="genres-group">
        {Object.keys(groupedGenres).sort().map(letter => (
          <div key={letter} className="genre-group">
            <div className="group-header">
              <h3 className="group-letter">{letter} :</h3>
            </div>
            <div className="genres-grid">
              {groupedGenres[letter].map(genre => (
                <div key={genre.id} className="genre-item">
                  <Link to={`/genres/${genre.id}`}>
                    <h4>{genre.name}</h4>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenresList;
