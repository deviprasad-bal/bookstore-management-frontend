import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../css/BooksByAuthor.css';

const BooksByAuthor = () => {
  const { authorId } = useParams();
  const [books, setBooks] = useState([]);
  const [author, setAuthor] = useState({ firstname: '', lastname: '' });

  useEffect(() => {
    fetchBooksByAuthor();
    fetchAuthor();
  }, [authorId]);

  const fetchBooksByAuthor = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/bookstore/authors/${authorId}/books`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books by author:', error);
    }
  };

  const fetchAuthor = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/bookstore/authors/${authorId}`);
      setAuthor(response.data);
    } catch (error) {
      console.error('Error fetching author details:', error);
    }
  };

  return (
    <div className="books-by-author">
      <h2>Books by {author.firstname} {author.lastname}</h2>
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
        <p><span style={{color: 'white'}}>There are currently no books by {author.firstname} {author.lastname} in our Bookstore.</span></p>
      )}
    </div>
  );
};

export default BooksByAuthor;