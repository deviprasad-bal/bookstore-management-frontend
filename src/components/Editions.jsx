import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Editions.css';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Editions = ({ onAddToCart , cartItems}) => {
    const { bookId } = useParams();
    const [editions, setEditions] = useState([]);

    useEffect(() => {
        fetchEditions();
    }, [bookId]);

    const fetchEditions = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/bookstore/books/${bookId}/editions`);
            setEditions(response.data);
        } catch (error) {
            console.error('Error fetching edition data:', error);
        }
    };

    const handleAddToCart = (item) => {
        const cartItem = cartItems.find(cartItem => cartItem.editionNo === item.editionNo);

        const currentCartQuantity = cartItem ? cartItem.quantity : 0;
        const availableStock = item.inventory.totalStocks;

        if (availableStock === 0) {
            toast.error('This book is out of stock');
        } else if (currentCartQuantity + 1 > availableStock) {
            toast.error(`Cannot add more than ${availableStock} units to the cart`);
        } else {
            onAddToCart(item);
            toast.success('Book has been added to cart!');
        }
    };

    return (
        <div className="edition-container">
            {editions.map((item) => (
                <div key={item.editionNo} className="edition-item">
                    <h2><p><strong>{item.book.title}</strong></p></h2>
                    <p><strong>Edition:</strong> {item.editionNo}</p>
                    <p><strong>Published On:</strong> {new Date(item.publishedOn).toLocaleDateString()}</p>
                    <p><strong>Price:</strong> ₹ <span className="price">{item.price}</span></p>
                    <p>
                        {item.inventory.totalStocks === 0 ? (
                            <span className="low-stock">Out Of Stock</span>
                        ) : item.inventory.totalStocks > 5 ? (
                            <span className="in-stock">In stock</span>
                        ) : (
                            <span className="low-stock">Only {item.inventory.totalStocks} left</span>
                        )}
                    </p>
                    <button 
                        className="add-to-cart-button" 
                        onClick={() => handleAddToCart(item)}
                        >
                        Add to Cart
                    </button>
                    {item.inventory.totalStocks === 0 && (
                        <p className="error-message">Out of stock: Cannot be added to cart.</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Editions;
