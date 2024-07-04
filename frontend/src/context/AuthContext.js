import React, { createContext, useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const [token, setToken] = useState('');

  useEffect(() => {
    if (user) {
      user.getIdToken().then((token) => {
        setToken(token);
      });
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
