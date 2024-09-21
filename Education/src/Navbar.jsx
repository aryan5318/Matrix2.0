import React from 'react';
import './Navbar.css'; // Importing the CSS file for styling

const Navbar = () => {
  return (<>
    <nav className="navbar">
      <div className="navbar-left">
        {/* IMDb Logo */}
        <img className='logoimg'  src='/logo.png'></img>
        
        {/* Menu */}
        <div className="navbar-menu">
          <button className="menu-button">Menu</button>
          <div className="dropdown-content">
           
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="navbar-search">
        <input type="text" placeholder="Search Course" className="search-input" />
      </div>

      
    </nav>
    </>
  );
};

export default Navbar;
