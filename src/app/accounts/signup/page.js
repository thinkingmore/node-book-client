"use client"
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import styles from './page.module.css';
import Link from 'next/link';

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/signup', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
      });

      if (response.status === 200) {
            console.log("User created successfully")
      } else {
          console.log("Failed to create user")
      }
    } catch (error) {
        console.error('Error:', error);
    }
  
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSignup}>
        <h3 className={styles.title}>Sign Up</h3>
        <div>
          <input className={styles.input}
            name="username"
            type="text"
            placeholder="Username"
            onChange={handleInputChange}
          />
          <input className={styles.input}         
            name="email"
            type="text"
            placeholder="Email"
            onChange={handleInputChange}
          />
          <input className={styles.input}
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleInputChange}
          />
          <button className={styles.submit} type="submit">Submit</button>
          <div className={styles.text}>
            <span>Already have an account?</span>
          </div>
        </div>
      </form>
    </div>
  );
}
