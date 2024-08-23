import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../css/BooksByGenre.css';

const BooksByGenre = () => {
  const { genreId } = useParams();
  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState({ name: '' });

  useEffect(() => {
    fetchBooksByGenre();
    fetchGenre();
  }, [genreId]);

  const fetchBooksByGenre = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/bookstore/genres/${genreId}/books`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books by genre:', error);
    }
  };

  const fetchGenre = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/bookstore/genres/${genreId}`);
      setGenre(response.data);
    } catch (error) {
      console.error('Error fetching genre details:', error);
    }
  };

  return (
    <div className="books-by-genre">
      <h2>Books in {genre.name}</h2>
      {books.length > 0 ? (
        <ul>
          {books.map(book => (
            <li key={book.id}>
              <div className="book-item">
                <h3>{book.title}</h3>
                <p><strong>Author:</strong> {book.author.firstname} {book.author.lastname}</p>
                <p><strong>Genre:</strong> {book.genre.name}</p>
                <Link to={`/books/${book.id}/editions`} className="button-link">View Details</Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p><span style={{color: 'white'}}>There are currently no books in {genre.name}.</span></p>
      )}
    </div>
  );
};

export default BooksByGenre;