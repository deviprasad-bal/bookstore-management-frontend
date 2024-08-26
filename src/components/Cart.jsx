import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Cart.css';
import { toast } from 'react-toastify';

const Cart = ({ cartItems, setCartItems }) => {
    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleRemoveFromCart = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const handleUpdateQuantity = (id, quantity, availableStock) => {
        const parsedQuantity = parseInt(quantity);

        if (parsedQuantity > availableStock) {
            toast.error(`Cannot add more than ${availableStock} units to the cart.`);
            return;
        }

        if (parsedQuantity < 1) {
            toast.error('Quantity cannot be less than 1.');
            return;
        }

        setCartItems(cartItems.map(item => 
            item.id === id ? { ...item, quantity: parsedQuantity } : item
        ));
    };

    const navigate = useNavigate();

    const handleProceedToPayment = () => {
        const hasInvalidQuantity = cartItems.some(item => !item.quantity || isNaN(item.quantity));

        if (hasInvalidQuantity) {
            toast.error('Please enter a valid quantity for all items before proceeding to payment.');
            return;
        }

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
                                    onChange={(e) => handleUpdateQuantity(item.id, e.target.value, item.inventory.totalStocks)}
                                />
                            </p>
                            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                            {item.quantity > item.inventory.totalStocks && (
                                <p className="error-message">Not enough stock. Please reduce the quantity.</p>
                            )}
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