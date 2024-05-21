import React from 'react';
import './Cart.css'
import { NavLink } from 'react-router-dom'; // Assuming you're using React Router for navigation
const ClientCartPage = ({ state, dispatch, total, handlePlaceOrder }) => {
    return (
        <div className="client-cart-page">
            {state && state.length === 0 ? (
                <div className="empty-cart">
                    <h2>Your cart is empty</h2>
                    <img src="https://cdn.dribbble.com/users/2046015/screenshots/4591856/media/99db7af8c3d839dd65017f76ae434785.gif" alt="" />
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
                        {state && state.map((item, index) => (
                            <div className="client-cart-card" key={index}>
                                <div className="product-details">
                                    <img src={item.image_url} alt={item.name} />
                                    <div className="product-name">
                                        <p>{item.name}</p>
                                        <button onClick={() => dispatch({ type: 'REMOVE', payload: item })}>Remove</button>
                                    </div>   
                                </div>
                                <p>${item.price}</p>
                                <div className="quantity">
                                    <button onClick={() => {
                                        if (item.quantity > 1) {
                                            dispatch({ type: 'DECREASE', payload: item });
                                        } else {
                                            dispatch({ type: 'REMOVE', payload: item });
                                        }
                                    }}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => dispatch({ type: 'INCREASE', payload: item })}>+</button>
                                </div>
                                <p className='total-price'>${item.quantity * item.price}</p>
                            </div>
                        ))}
                        <div className="total">
                            <h4>Subtotal</h4>
                            <h4>${total}</h4>
                        </div>
                        <div className="checkout-button">
                            <button className='button' onClick={handlePlaceOrder}>Checkout</button>
                        </div>
                        <div className="continue-shopping">
                            <NavLink className="Products-nav-link" to='/products'> Continue Shopping</NavLink>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default ClientCartPage;