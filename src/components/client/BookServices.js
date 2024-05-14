// this is the cart for booking
import { useContext, useEffect} from 'react';
import { basketContext } from "./component/context/ServiceContext";
import { NavLink } from "react-router-dom";

function ClientBasket() {
    const { state, dispatch } = useContext(basketContext);

    

    useEffect(() => {
        // Any side effects can be handled here, if needed
    }, []);

    const total = state.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    const handlePlaceOrder = async () => {
        
        
        try {
            const res = await fetch('/serviceorders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include the access token from local storage
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`, 
                },
                body: JSON.stringify({
                    total: total,
                    items: state.map(item => ({ id: item.id, quantity: item.quantity })),
                }),
            });

            if (res.ok) {
                
                // Clear the cart after successful order placement
                dispatch({ type: 'CLEAR_CART' });
            } else {
                console.error('Failed to place order');
            }
        } catch (error) {
            console.error('Error:', error);
            
        
        }
    };

    return (
        <div className="client-basket-page">
            {state.length === 0 ? (
                <div className="empty-basket">
                    <h2>Your basket is empty</h2>
                    <img src="https://cdn.dribbble.com/users/2046015/screenshots/4591856/media/99db7af8c3d839dd65017f76ae434785.gif" alt="" />
                </div>            
            ) : (
                <>
                    <h2>Shopping Basket</h2>
                    <div className="client-basket">
                        <div className="client-basket-titles">
                            <h4>Product</h4>
                            <h4>Price</h4>
                            <h4>Quantity</h4>
                            <h4>Total</h4>
                        </div>
                        {state.map((item, index) => (
                            <div className="client-basket-card" key={index}>
                                <div className="product-details">
                                    <img src={item.image_url} alt={item.name} />
                                    <div className="product-name">
                                        <p>{item.name}</p>
                                        <button onClick={() => dispatch({ type: 'REMOVE', payload: item })}>Remove</button>
                                    </div>   
                                </div>
                                <p>${item.price}</p>
                                <div className="quantity">
                                    <button onClick={() => dispatch({ type: 'DECREASE', payload: item })}>-</button>
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
                            <NavLink className="component-nav-link" to='/component/services'> Continue Shopping</NavLink>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default ClientBasket;