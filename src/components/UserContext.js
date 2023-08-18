import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [finalTheme, setTheme] = useState("Light");

  return (
    <UserContext.Provider value={{ user, setUser, finalTheme, setTheme }}>
      {children}
    </UserContext.Provider>
  );
};