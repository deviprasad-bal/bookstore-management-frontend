import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import Lottie from 'react-lottie';
import animationData from './animations/bookopen.json';
import Home from './components/Home';
import BooksList from './components/BooksList';
import AuthorsList from './components/AuthorsList';
import GenresList from './components/GenresList';
import BooksByAuthor from './components/BooksByAuthor';
import BooksByGenre from './components/BooksByGenre';
import Editions from './components/Editions';
import AddBook from './components/AddBook';
import Cart from './components/Cart';
import Confirmation from './components/Confirmation';
import Cancel from './components/Cancel';
import './css/App.css';
import PaymentPage from './components/PaymentPage';

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const onAddToCart = (edition) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === edition.id);

      if (itemExists) {
        return prevItems.map((item) =>
          item.id === edition.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...edition, quantity: 1 }];
      }
    });
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <Router>
      <div className="app">
        <header className="app-header">
        <div className="header-content">
            <h1>BOOKSTORE</h1>
            <Lottie options={defaultOptions} height={160} width={160} />
        </div>
          <nav>
            <Link to="/"><strong>Home</strong></Link>
            <Link to="/books"><strong>Books</strong></Link>
            <Link to="/authors"><strong>Authors</strong></Link>
            <Link to="/genres"><strong>Genres</strong></Link>
          </nav>
          <div className="cart-icon-container">
          <Link to="/cart">
            <FaShoppingCart className="cart-icon" />
            <span className="cart-count">{cartItems.length}</span>
          </Link>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<BooksList />} />
            <Route path="/authors" element={<AuthorsList />} />
            <Route path="/genres" element={<GenresList />} />
            <Route path="/authors/:authorId" element={<BooksByAuthor />} />
            <Route path="/genres/:genreId" element={<BooksByGenre />} />
            <Route path="/books/:bookId/editions" element={<Editions onAddToCart={onAddToCart} cartItems={cartItems}/>} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems}/>} />
            <Route path="/payment" element={<PaymentPage cartItems={cartItems} setCartItems={setCartItems}/>} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/cancel" element={<Cancel />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
