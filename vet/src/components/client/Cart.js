import React, { useState, useEffect } from 'react';
import './Cart.css';
import { NavLink } from 'react-router-dom';

import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchCartItems = async () => {
            setLoading(true);
            try {
                const response = await fetch('/userCart', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setCartItems(data);
                } else {
                    setError('Failed to fetch cart items');
                }
            } catch (error) {
                setError('An error occurred while fetching cart items');
            } finally {
                setLoading(false);
            }
        };
        fetchCartItems();
    }, []);

    const handlePlaceOrder = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await fetch('/userProductOrders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    total: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
                    items: cartItems.map(item => ({ id: item.id, quantity: item.quantity })),
                }),
            });

            if (res.ok) {
                setSuccess(true);
                setCartItems([]);
            } else {
                setError('Failed to place order');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while processing your request');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveItem = async (itemId) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await fetch(`/userCart/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            if (res.ok) {
                setCartItems(cartItems.filter(item => item.id !== itemId));
            } else {
                setError('Failed to remove item from cart');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while removing the item');
        } finally {
            setLoading(false);
        }
    };

    const handleIncrease = async (itemToIncrease) => {
        try {
            const updatedQuantity = itemToIncrease.quantity + 1;
            const res = await fetch(`/userCart/${itemToIncrease.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ quantity: updatedQuantity })
            });
            if (res.ok) {
                setCartItems(cartItems.map(item => 
                    item.id === itemToIncrease.id ? { ...item, quantity: updatedQuantity } : item
                ));
            } else {
                setError('Failed to update item quantity');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while updating the item quantity');
        }
    };

    const handleDecrease = async (itemToDecrease) => {
        if (itemToDecrease.quantity <= 1) return;
        try {
            const updatedQuantity = itemToDecrease.quantity - 1;
            const res = await fetch(`/userCart/${itemToDecrease.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ quantity: updatedQuantity })
            });
            if (res.ok) {
                setCartItems(cartItems.map(item => 
                    item.id === itemToDecrease.id ? { ...item, quantity: updatedQuantity } : item
                ));
            } else {
                setError('Failed to update item quantity');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while updating the item quantity');
        }
    };

    const total = cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    // Pseudo user data
    const email = "julimurag@gmail.com";
    const phone_number = "07012345678";
    const name = "Julius";


    const config = {
        public_key: 'FLWPUBK_TEST-f0cd2c19f60c7ce7cacad539d983df19-X',
        tx_ref: Date.now(),
        amount: 1600,
        currency: 'KES',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
          email,
          phone_number,
          name,
        },
        customizations: {
          title: 'Payment',
          description: 'Payment for items in cart',
          logo: 'https://i.pinimg.com/236x/5a/c3/6c/5ac36ca9f1faf1211c0ec9d743e835e3.jpg',
        },
      };
    
      const fwConfig = {
        ...config,
        text: 'Make Payment',
        callback: (response) => {
           console.log(response);
          closePaymentModal() // this will close the modal programmatically
        },
        onClose: () => {},
      };
    

    return (
        <div className="client-cart-page">
            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <h2>Your cart is empty</h2>
                    <img src="https://cdn.dribbble.com/users/675297/screenshots/4334597/basti.gif" alt="Empty Cart" />
                </div>            
            ) : (
                <>
                    <h2>Shopping Cart</h2>
                    <div className="client-cart">
                        <div className="client-cart-titles">
                            <h4>Product</h4>
                            <h4>Price</h4>
                            <h4>Quantity</h4>
                            <h4>Total</h4>
                        </div>
                        {cartItems.map((item, index) => (
                            <div className="client-cart-card" key={index}>
                                <div className="product-details">
                                    <img src={item.image_url} alt={item.name} />
                                    <div className="product-name">
                                        <p>{item.name}</p>
                                        <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                                    </div>   
                                </div>
                                <p>ksh{item.price}</p>
                                <div className="quantity">
                                    <button 
                                        onClick={() => handleDecrease(item)}
                                        disabled={item.quantity <= 1}
                                    >-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleIncrease(item)}>+</button>
                                </div>
                                <p className='total-price'>ksh{item.quantity * item.price}</p>
                            </div>
                        ))}
                        <div className="total">
                            <h4>Subtotal</h4>
                            <h4>ksh{total}</h4>
                        </div>
                        <div className="checkout-button">
                            <button className='button' onClick={handlePlaceOrder} disabled={loading}>
                            <FlutterWaveButton {...fwConfig} />
                            </button>
                            {error && <p className="error">{error}</p>}
                            {success && <p className="success">Order placed successfully!</p>}
                        </div>
                        <div className="continue-shopping">
                            <NavLink className="client-nav-link" to='/products'> Continue Shopping</NavLink>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;