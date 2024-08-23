import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/AddBook.css';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [authorFirstName, setAuthorFirstName] = useState('');
  const [authorLastName, setAuthorLastName] = useState('');
  const [genre, setGenre] = useState('');
  const [editionNo, setEditionNo] = useState('');
  const [publishedOn, setPublishedOn] = useState('');
  const [price, setPrice] = useState('');
  const [genres, setGenres] = useState([]);
  const [stocks, setStocks] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get('http://localhost:8080/bookstore/genres');
        const sortedGenres = response.data.sort((a, b) => a.name.localeCompare(b.name));
        setGenres(sortedGenres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookData = {
      title,
      authorFirstName,
      authorLastName,
      genre,
      editionNo: parseInt(editionNo),
      publishedOn,
      price: parseInt(price),
      stocks: parseInt(stocks)
    };

    try {
      const response = await axios.post('http://localhost:8080/bookstore/books/add', bookData);
      setSuccessMessage('Book has been added successfully!');
      setTitle('');
      setAuthorFirstName('');
      setAuthorLastName('');
      setGenre('');
      setEditionNo('');
      setPublishedOn('');
      setPrice('');
      setErrorMessage('');
    } catch (error) {
        if (error.response && error.response.status === 400) {
            setErrorMessage(error.response.data);
        } else {
            setErrorMessage('An error occurred while adding the book');
        }
    }
  };

  return (
    <div className="add-book-form">
      <h2>Add a New Book</h2>
      {successMessage && <div className="success-message"><strong>{successMessage}</strong></div>}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <div className="author-names">
        <label>
          Author First Name:
          <input type="text" value={authorFirstName} onChange={(e) => setAuthorFirstName(e.target.value)} required />
        </label>
        <label>
          Author Last Name:
          <input type="text" value={authorLastName} onChange={(e) => setAuthorLastName(e.target.value)} required />
        </label>
        </div>
        <label>
          Genre:
          <select value={genre} onChange={(e) => setGenre(e.target.value)} required>
            <option value="" disabled>Select a genre</option>
            {genres.map((g) => (
              <option key={g.id} value={g.name}>{g.name}</option>
            ))}
          </select>
        </label>
        <label>
          Edition Number:
          <input type="number" value={editionNo} onChange={(e) => setEditionNo(e.target.value)} required />
        </label>
        <label>
          Published On:
          <input type="date" value={publishedOn} onChange={(e) => setPublishedOn(e.target.value)} required />
        </label>
        <label>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </label>
        <label>
        Stocks:
        <input type="number" value={stocks} onChange={(e) => setStocks(e.target.value)} required />
        </label>
        <button type="submit">Add Book</button>
      </form>
      {errorMessage && <p className='errorMessage'>{errorMessage}</p>}
    </div>
  );
};

export default AddBook;