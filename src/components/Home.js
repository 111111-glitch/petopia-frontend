import React from 'react'
import './Home.css'
import Footer from './Footer'

const Home = () => {
    return (
        <div className="home-container">
        <div className="home-header">
        <img src="header.jpg" alt="banner" />
        <div className="home-header-text">
        <h1>petopia - Your Pet's Paradise</h1>
        <p>Sometimes you are seated at home and all of a sudden, mac, your pet cat is hungry. You look into the can where you store her food and realize after the next serving, all hell will break loose. You need a quick way to order for a refill in time.</p>
        <button class="button type1">
  <span class="btn-txt">Shop Now</span>
</button>
        </div>
        </div>

        <div className="home-mid">
        <div className="home-mid-text">
        <h4>Latest Products</h4>
        <h2>Discover New</h2>
        <hr />
        </div>
        <div className="home-mid-images">
        <div className="home-mid-content">
        <img src="/beeftwists.jpg" alt="" />
    
        </div>
        <div className="home-mid-content">
        <img src="/chickenrolls.jpg" alt="" />
        
        </div>
        <div className="home-mid-content">
        <img src="/beefpork.jpg" alt="" />
        
        </div>
        <div className="home-mid-content">
        <img src="/chickenpops.jpg" alt="" />
    
        </div>
        </div>
        <div className="home-mid-text">
        <h4>SHOP</h4>
        <h2>Best selling</h2>
        <hr />
        </div>
        <div className="home-mid-images">
        <div className="home-mid-content">
        <img src="/tu.jpg" alt="" />
    
        </div>
        <div className="home-mid-content">
        <img src="/nut.jpg" alt="" />
        
        </div>
        <div className="home-mid-content">
        <img src="/kind.jpg" alt="" />
        
        </div>
        <div className="home-mid-content">
        <img src="/smoo.jpg" alt="" />
        
        </div>
        </div>
        </div>

        <div className="home-lower">
        <div className="home-lower-container">
        <div className="home-lower-text">
        <h4>ABOUT US</h4>
        <h2>Welcome to Petopia</h2>
        <p>At Petopia, we understand that pets are an integral part of your family. That’s why we strive to provide the best quality, natural and organic pet food and treats to keep your furry friends healthy and happy. Our products are made with only the highest quality ingredients, ensuring your pet gets the best nutrition possible.</p>
          <button class="button type1">
  <span class="btn-txt">Learn More</span>
</button>
        </div>
        <img src="/pet.jpg" alt="" />

        
    </div>
</div>
        <div className="why-choose-us-container">
        <h4>Best In Business</h4>
        <h2>Why Choose Us</h2>
        <p>At petopia, we believe that pets deserve the same high-quality food as humans. Our natural and organic pet food and treats are made with only the highest quality ingredients, ensuring your pet gets the best nutrition possible. Plus, our fast and easy ordering process means you can always keep your pet happy and healthy.</p>
        <hr />
        </div>
        <div className="promotion-container">
        </div>
        <div>
            <Footer />
        </div>
        </div> 
    )
}

export default Home