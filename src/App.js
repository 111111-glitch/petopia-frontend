import './App.css';
import Navbar from './components/client/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Products from './components/client/Products';
import Services from './components/client/Services';
import Cart from './components/client/Cart';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/products' element={<Products />} />
        <Route path='/services' element={<Services />} />
      </Routes>
    </div>
  );
}

export default App;
