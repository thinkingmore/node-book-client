"use client"
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const[user,setUser] = useState(null)

  // Function to get the user from the cookie
  const getUserFromCookie = () => {
    const userCookie = Cookies.get('book-review-user');
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
  };

  useEffect(() => {
    getUserFromCookie();
  }, []); 
  
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AuthContext.Provider value={{ user, isLoading, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);