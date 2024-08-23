import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import '../css/Home.css';
import axios from 'axios';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [filteredAuthors, setFilteredAuthors] = useState([]);
    const [filteredGenres, setFilteredGenres] = useState([]);

    useEffect(() => {
        fetchBooks();
        fetchAuthors();
        fetchGenres();
    }, []);

    useEffect(() => {
        filterResults();
    }, [searchTerm, books, authors, genres]);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/bookstore/books');
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const fetchAuthors = async () => {
        try {
            const response = await axios.get('http://localhost:8080/bookstore/authors');
            setAuthors(response.data);
        } catch (error) {
            console.error('Error fetching authors:', error);
        }
    };

    const fetchGenres = async () => {
        try {
            const response = await axios.get('http://localhost:8080/bookstore/genres');
            setGenres(response.data);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    const filterResults = () => {
        if (searchTerm.trim() === '') {
            setFilteredBooks([]);
            setFilteredAuthors([]);
            setFilteredGenres([]);
        } else {
            setFilteredBooks(books.filter(book =>
                book.title.toLowerCase().includes(searchTerm.toLowerCase())
            ));
            setFilteredAuthors(authors.filter(author =>
                `${author.firstname} ${author.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
            ));
            setFilteredGenres(genres.filter(genre =>
                genre.name.toLowerCase().includes(searchTerm.toLowerCase())
            ));
        }
    };

    const highlightText = (text, searchTerm) => {
        if (!searchTerm.trim()) {
            return text;
        }
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.split(regex).map((part, index) =>
            regex.test(part) ? <span key={index} className="highlight">{part}</span> : part
        );
    };

    return (
        <div className="home">
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Search by book, author, or genre..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={filterResults}><FaSearch /></button>
            </div>

            {searchTerm.trim() === '' && (
                <div className="categories">
                    <div className="category-books">
                        <Link to="/books"><button className='btxt'>Books</button></Link>
                    </div>
                    <div className="category-authors">
                        <Link to="/authors"><button className='btxt'>Authors</button></Link>
                    </div>
                    <div className="category-genres">
                        <Link to="/genres"><button className='btxt'>Genres</button></Link>
                    </div>
                </div>
            )}
            {searchTerm.trim() !== '' && (
                <div className="search-results">
                    <h2 ><span style={{ color: 'white' }}>Search Results</span></h2>
                    <div className="results-section">
                        <div className="books-results">
                            <h2>Books</h2>
                            <ul>
                                {filteredBooks.map(book => (
                                    <li key={book.id}>
                                        <div className="book-item">
                                            <h4>{highlightText(book.title, searchTerm)}</h4>
                                            <p><strong>Author:</strong> {highlightText(`${book.author.firstname} ${book.author.lastname}`, searchTerm)}</p>
                                            <p><strong>Genre:</strong> {highlightText(book.genre.name, searchTerm)}</p>
                                            <Link to={`/books/${book.id}/editions`} className="button-link">View Details</Link>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="authors-results">
                            <h2>Authors</h2>
                            <ul>
                                {filteredAuthors.map(author => (
                                    <li key={author.id}>
                                        <div className="author-item">
                                            <Link to={`/authors/${author.id}`}>
                                            <h4>{highlightText(`${author.firstname} ${author.lastname}`, searchTerm)}</h4>
                                            </Link>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="genres-results">
                            <h2>Genres</h2>
                            <ul>
                                {filteredGenres.map(genre => (
                                    <li key={genre.id}>
                                        <div className="genre-item">
                                            <Link to={`/genres/${genre.id}`}>
                                            <h4>{highlightText(genre.name, searchTerm)}</h4>
                                            </Link>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
