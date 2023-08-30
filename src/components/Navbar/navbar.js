"use client"
import React, { useState } from 'react';
import styles from './navbar.module.css'; 
import Image from 'next/image';
import { useSearch } from '../../app/contexts/SearchContext';


const Navbar = () => {
  const { handleSearch } = useSearch();

  const setSearchQuery = (e) => {
    const searchBar = document.getElementById("searchBar")
    e.preventDefault()
    const searchQuery = searchBar.value;
    handleSearch(searchQuery);
  }
  return (
    <nav className={styles.header}>
        <div className={styles.navbar}>
            <div>
              Book Review
            </div>
            <div className={styles.navbarRight}>
              <input onChange={setSearchQuery} className={styles.input} type="text" id="searchBar" name="search" placeholder="Search.."/>
              <button onClick={setSearchQuery} type="submit" className={styles.searchButton}>
                Search
              </button>
            <button type="submit" className={styles.loginButton}>
              Login
            </button>
            </div>
        </div>
    </nav>
  );
};

export default Navbar;
