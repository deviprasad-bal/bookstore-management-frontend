import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Cart.css';

const Cart = ({ cartItems, setCartItems }) => {
    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleRemoveFromCart = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const handleUpdateQuantity = (id, quantity) => {
        setCartItems(cartItems.map(item => 
            item.id === id ? { ...item, quantity: parseInt(quantity) } : item
        ));
    };

    const navigate = useNavigate();

    const handleProceedToPayment = () => {
        navigate('/payment');
    };

    return (
        <div className="cart-container">
            <h2>Book Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <p><strong>{item.book.title}</strong></p>
                            <p>Edition: {item.editionNo}</p>
                            <p>Price: ₹ <strong>{item.price}</strong></p>
                            <p>
                                Quantity: 
                                <input 
                                    type="number" 
                                    value={item.quantity} 
                                    min="1"
                                    onChange={(e) => handleUpdateQuantity(item.id, e.target.value)}
                                />
                            </p>
                            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                        </div>
                    ))}
                    <p><strong>Total Price: ₹ {calculateTotalPrice()}</strong></p>
                    <button onClick={handleProceedToPayment}>Proceed to Payment</button>
                </>
            )}
        </div>
    );
};

export default Cart;
