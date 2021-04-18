import { createContext, useState } from 'react';

export const UserContext = createContext();

export default function StreamsProvider({ children }) {
  const [userName, setUserName] = useState(localStorage.getItem('username'));
  const [loggedIn, setLoggedIn] = useState(Boolean(userName));
  return (
    <UserContext.Provider
      value={{
        userName,
        setUserName,
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
