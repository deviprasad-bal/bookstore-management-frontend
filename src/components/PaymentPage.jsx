import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/PaymentPage.css';

const PaymentPage = ({ cartItems , setCartItems}) => {
    const [total, setTotal] = useState(0);
    const [cgst, setCgst] = useState(0);
    const [sgst, setSgst] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const calculatedTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setTotal(calculatedTotal);
        const calculatedCgst = (calculatedTotal * 0.09).toFixed(2);
        const calculatedSgst = (calculatedTotal * 0.09).toFixed(2);
        setCgst(calculatedCgst);
        setSgst(calculatedSgst);
        setGrandTotal((calculatedTotal + parseFloat(calculatedCgst) + parseFloat(calculatedSgst)).toFixed(2));
    }, [cartItems]);

    const handlePayment = async (status) => {
        try {
            // Prepare the order request payload
            const orderRequest = {
                total: grandTotal,
                status: status === 'accepted' ? 'Accepted' : 'Rejected',
                items: cartItems.map(item => ({
                    editionId: item.id,
                    price: item.price,
                    quantity: item.quantity,
                    value: item.price * item.quantity,
                })),
            };

            // Send the order creation request
            await axios.post('http://localhost:8080/bookstore/orders', orderRequest);

            // Navigate based on the payment status
            if (status === 'accepted') {
                setCartItems([]);
                navigate('/confirmation');
            } else {
                navigate('/cancel');
            }
        } catch (error) {
            console.error('Error processing payment:', error);
        }
    };

    return (
        <div className="payment-container">
            <h2>Payment Details</h2>
            <table className="payment-table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Edition</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map(item => (
                        <tr key={item.id}>
                            <td>{item.book.title}</td>
                            <td>{item.editionNo}</td>
                            <td>₹ {item.price.toFixed(2)}</td>
                            <td>{item.quantity}</td>
                            <td>₹ {(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="4"><strong>Total:</strong></td>
                        <td><strong>₹ {total.toFixed(2)}</strong></td>
                    </tr>
                    <tr>
                        <td colSpan="4">CGST (9%):</td>
                        <td>₹ {cgst}</td>
                    </tr>
                    <tr>
                        <td colSpan="4">SGST (9%):</td>
                        <td>₹ {sgst}</td>
                    </tr>
                    <tr>
                        <td colSpan="4"><strong>Grand Total:</strong></td>
                        <td><strong>₹ {grandTotal}</strong></td>
                    </tr>
                </tbody>
            </table>
            <button className="accept" onClick={() => handlePayment('accepted')}>Accept Payment</button>
            <button className="reject" onClick={() => handlePayment('rejected')}>Reject Payment</button>
        </div>
    );
};

export default PaymentPage;
