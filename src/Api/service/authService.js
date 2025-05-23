import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'jwtToken';

export const authService = {
  login: (token) => {
    localStorage.setItem(TOKEN_KEY, token);
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
  },
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },
  isAuthenticated: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return false;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime; // Check expiration
    } catch (error) {
      return false; // Invalid token
    }
  },
};