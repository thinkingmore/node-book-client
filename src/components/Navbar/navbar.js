"use client"
import React from 'react';
import styles from './navbar.module.css'; 
import { removeSessionCookie } from '@/utils/session'; 
import { useSearch } from '../../app/contexts/SearchContext';
import { useAuth } from '@/app/contexts/authContext';
import { useRouter } from 'next/navigation';


const Navbar = () => {
  const { handleSearch } = useSearch();
  const { user, setUser } = useAuth();
  const router = useRouter();
  
  // handle logout
  const logout = () => {
    setUser(null);
    removeSessionCookie('book-review-user');
    router.push('/accounts/login')
  }

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
              <button onClick={logout} type="submit" className={styles.loginButton}>
                {
                  user?
                  "Logout" : "Login"
                }
              </button>
            </div>
        </div>
    </nav>
  );
};

export default Navbar;
