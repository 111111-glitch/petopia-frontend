import React, { useContext, useEffect, useState } from "react";
import './Services.css'; // Make sure to update your CSS file accordingly
import { cartContext } from "../context/ServiceContext";

function Services() {
    const [services, setServices] = useState([]);
    const [sortOption, setSortOption] = useState('Default'); // State to hold the current sorting option

    useEffect(() => {
        fetch("http://127.0.0.1:5555/services")
            .then(resp => resp.json())
            .then((data) => {
                setServices(data);
            })
            .catch(error => {
                console.error('Error fetching services data:', error);
            });
    }, []);

    const globalState = useContext(cartContext);
    const dispatch = globalState?.dispatch;

    // Function to handle sorting based on the selected option
    const handleSort = (event) => {
        const option = event.target.value;
        setSortOption(option);
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
        <div className='client-services'>
            <div className="flexColStart p-head">
                <span className='orangeText'>Best Choices</span>
                <span className='primaryText'>Popular Categories</span>
            </div>
            <div className="client-services-content">
                <p>Showing all {services.length} results</p>
                <select value={sortOption} onChange={handleSort}>
                    <option value="Default">Default Sorting</option>
                    <option value="Title">Sort By Name</option>
                    <option value="Price-low">Sort By Price: low to high</option>
                    <option value="Price-high">Sort By Price: high to low</option>
                </select>
            </div>
            <div className="client-services-container">
                {services.map((service) => (
                    <div className="flexColStart p-card" key={service.id}>
                        <img src={service.image_url} alt="category"/>
                        <span className="secondaryText p-price">
                            <span style={{color:"orange"}}>$</span>
                            <span>{service.price}</span>
                        </span>
                        <span className='primaryText'>{service.name}</span>
                        <span className='secondaryText'>{service.description}</span>
                        <button className="p-buttons" onClick={() => dispatch && dispatch({ type: 'ADD', payload: service })}>
                            BOOK NOW
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Services;
