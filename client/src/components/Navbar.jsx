import React from "react";
import { Link } from "react-router-dom";
import tslogo from '../assets/StatePoliceLogo.png'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/eaform">
          <img
            src={tslogo}
            alt="Logo"
            width="75"
            height="75"
            className="d-inline-block align-top"
          />
        </Link>
        <div className="ml-auto">
          <Link className="btn" to="/admin/login" style={{backgroundColor:"#39478C",color:"white"}}>
            Admin Log In
          </Link>
        </div>
       </div>    
    </nav>
  );
};

export default Navbar;
