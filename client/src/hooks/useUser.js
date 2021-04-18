import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const useUser = () => {
  const { userName, setUserName, loggedIn, setLoggedIn } = useContext(
    UserContext
  );

  const logIn = (username) => {
    setUserName(username);
    localStorage.setItem('username', username);
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('username');
    setUserName('');
    setLoggedIn(false);
  };

  return { loggedIn, userName, logIn, logOut };
};

export default useUser;
