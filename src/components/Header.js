import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-title">Blog Title</div>
      <nav className="header-nav">
        <ul>
          <li><Link to="/add">Add New Article</Link></li>
          <li><Link to="/local-news">Local News</Link></li>
          <li><a href="http://localhost:3001/" target="_blank" rel="noopener noreferrer">Global News</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
