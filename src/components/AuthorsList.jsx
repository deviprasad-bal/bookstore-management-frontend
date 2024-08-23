import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/AuthorsList.css';

const AuthorsList = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get('http://localhost:8080/bookstore/authors');
      const sortedAuthors = response.data.sort((a, b) => {
        const firstNameComparison = a.firstname.localeCompare(b.firstname);
        if (firstNameComparison !== 0) {
            return firstNameComparison;
        }
        return a.lastname.localeCompare(b.lastname);
    });
      setAuthors(sortedAuthors);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  return (
    <div className="authors-list">
      <h2>Authors</h2>
      <ul>
        {authors.map(author => (
          <li key={author.id}>
            <div className="author-item">
              <Link to={`/authors/${author.id}`}>
              <h3>{author.firstname} {author.lastname}</h3>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorsList;
