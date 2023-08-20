import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [finalTheme, setTheme] = useState("Light");

  return (
    <UserContext.Provider value={{ finalTheme, setTheme }}>
      {children}
    </UserContext.Provider>
  );
};