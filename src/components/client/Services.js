import React, { useState, useEffect } from 'react';
import './Services.css';


const Services = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [displayOption, setDisplayOption] = useState('Default');

  useEffect(() => {
  
  fetch('/userproducts')
  .then(response =>response.json())
  .then(data =>{
    const filteredServices= data.filter(item => item.type === 'service');
    setServices(filteredServices);
  });
},[]);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
    console.log('Added to cart:', product);
  };

  const handleDisplay = (event) => {
    const option = event.target.value;
    setDisplayOption(option);
    let sortedServices = [...services];

    switch (option) {
      case 'Title':
        sortedServices.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Price-low':
        sortedServices.sort((a, b) => a.price - b.price);
        break;
      case 'Price-high':
        sortedServices.sort((a, b) => b.price - a.price);
        break;
      default:
        // Default sorting
        break;
    }

    setServices(sortedServices);
  };

  return (
    <div>
      <div className="flexColStart s-head">
        <span className='orangeText'>Best Choices</span>
        <span className='primaryText'>Popular Categories</span>
      </div>
     <h2>DISPLAY BY</h2>
      <select value={displayOption} onChange={handleDisplay}>
        <option value="Default">Default Display</option>
        <option value="Title">Display By Name</option>
        <option value="Price-low"> By Price: low to high</option>
        <option value="Price-high">By Price: high to low</option>
      </select>
      <div className="services-container">
        {services.map((service) => (
          <div key={service.id}>
            <div onClick={() => handleServiceClick(service)}>
            <img src={service.image_url} alt={service.name} />
              <h3>{service.name}</h3>
              <p>Price: ${service.price}</p>
              <p>{service.description}</p>
              
              
            </div>
            {selectedService && selectedService.id === service.id && (
              <div>
                <p>{service.description}</p>
                <button onClick={() => handleAddToCart(product)}>
                <img src="/images/cart.png" alt="Cart" style={iconStyle} />
                  Add to Cart</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;

