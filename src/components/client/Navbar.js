import { NavLink } from "react-router-dom";
import "./Navbar.css";

// import Header from "./Images/Header.png"

function NavBar() {
  return (
    <div className="navbar-container">
      <NavLink exact to="/" className={"navbar-home"}>HOME</NavLink>
      <NavLink exact to="/questtrail" className={"navbar-Products"}>PRODUCTS</NavLink>
      <NavLink exact to="/about us" className={"navbar-Services"}>SERVICES</NavLink>
      
    </div>
  );
}

export default NavBar;