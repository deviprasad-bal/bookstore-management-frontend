// BooksList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../css/BooksList.css';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const navigate = useNavigate();

  const handleAddBook = () => {
    navigate('/add-book');
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/bookstore/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <div className="books-list">
      <h2>Books List</h2>
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
        <button className="add-book-button" onClick={handleAddBook}>Add Book</button>
      </ul>
    </div>
  );
};

export default BooksList;
