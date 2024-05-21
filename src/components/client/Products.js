import React, { useState, useEffect } from 'react';
import './Product.css';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortOption, setSortOption] = useState('Default');

  useEffect(() => {
    

  fetch('/userproducts')
  .then(response =>response.json())
  .then(data =>{
    const filteredProducts= data.filter(item => item.type === 'product');
    setProducts(filteredProducts);
  });
},[]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
    console.log('Added to cart:', product);
  };

  // const handleRemoveFromCart = (product) => {
  //   setCartItems(cartItems.filter((item) => item.id !== product.id));
  // };

  const handleSort = (event) => {
    const option = event.target.value;
    setSortOption(option);
    let sortedProducts = [...products];

    switch (option) {
      case 'Title':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Price-low':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'Price-high':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        // Default sorting
        break;
    }

    setProducts(sortedProducts);
  };

  return (
    <div>
      {/* <div className="flexColStart p-head">
        <span className='orangeText'>Best Choices</span>
        <span className='primaryText'>Popular Categories</span>
      </div> */}
      <h2>PRODUCTS</h2>
      <select value={sortOption} onChange={handleSort}>
        <option value="Default">Default Sorting</option>
        <option value="Title">Sort By Name</option>
        <option value="Price-low">By Price: low to high</option>
        <option value="Price-high">Sort By Price: high to low</option>
      </select>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id}>
            <div onClick={() => handleProductClick(product)}>
            <img src={product.image_url} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              
            </div>
            {selectedProduct && selectedProduct.id === product.id && (
              <div>
                <p>{product.description}</p>
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                
              </div>
            )}
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Products;