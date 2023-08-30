import Cookies from 'js-cookie';

// Function to set a session cookie
export const setSessionCookie = (key, value, expiresInSeconds) => {
  Cookies.set(key, value, { expires: expiresInSeconds / (60 * 60 * 24) }); // Convert seconds to days
};

// Function to get a session cookie
export const getSessionCookie = (key) => {
  return Cookies.get(key);
};

// Function to remove a session cookie
export const removeSessionCookie = (key) => {
  Cookies.remove(key);
};
