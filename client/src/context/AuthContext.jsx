import { createContext, useContext, useEffect, useState } from 'react';

import api from '../lib/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    localStorage.removeItem('death-clock-token');
    localStorage.removeItem('death-clock-user');

    let ignore = false;

    api
      .get('/auth/me')
      .then(({ data }) => {
        if (ignore) {
          return;
        }

        setUser(data.user);
      })
      .catch(() => {
        if (ignore) {
          return;
        }

        setUser(null);
      })
      .finally(() => {
        if (!ignore) {
          setIsBooting(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const setAuth = (payload) => {
    setUser(payload.user || payload);
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // Ignore logout transport failures and clear client state anyway.
    }

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isBooting,
        setAuth,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
