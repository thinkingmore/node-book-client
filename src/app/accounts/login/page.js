"use client"
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { setSessionCookie } from '@/utils/session';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/authContext';

export default function Login() { 

  const { user, setUser } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = (e) => {
    setError("")
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
      });
      if (response.status === 201) {
            const data = await response.json(); 
            setUser(data.user);
            setSessionCookie('book-review-user', JSON.stringify(data.user), 3600);
            router.push("/dashboard")
      } else {
          const data = await response.json(); 
          setError(data)
      }
    } catch (error) {
        console.error('Error:', error);
    }

  
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleLogin}>
        <h3 className={styles.title}>Login</h3>
        <div>
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
          { error && <p className={styles.error}>{error.message}</p>}
          <button className={styles.submit} type="submit">Submit</button>
          <div className={styles.text}>
            <span>Do not have an account?</span>
            <Link className={styles.link} href="/accounts/signup">Signup</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
