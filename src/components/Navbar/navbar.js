"use client"
import React, { useState } from 'react';
import styles from './navbar.module.css'; 
import Image from 'next/image';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Handle search functionality here
    console.log('Search submitted:', searchQuery);
    setSearchQuery('');
  };

  return (
    <nav className={styles.header}>
        <div className={styles.navbar}>
            <div>
              Book Review
            </div>
            <div className={styles.navbarRight}>
            <form>
              <input className={styles.input} type="text" name="search" placeholder="Search.."/>
              <button type="submit" className={styles.searchButton}>
                Search
              </button>
            </form>
            <button className={styles.loginButton}>
              Login
            </button>
            </div>
        </div>
    </nav>
  );
};

export default Navbar;
