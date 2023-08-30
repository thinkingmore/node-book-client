"use client"
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const[user,setUser] = useState(null)
  const [loading,setLoading] = useState(true);

  // Function to get the user from the cookie
  const getUserFromCookie = () => {
    const userCookie = Cookies.get('book-review-user');
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
    setLoading(false); // 
  };

  useEffect(() => {
    getUserFromCookie();
  }, []);
  

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);