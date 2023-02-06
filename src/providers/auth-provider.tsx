import React from "react";
import { useEffect, useState, createContext, useContext } from "react";
import { Dispatch, SetStateAction } from "react";
import { getAccounts } from "../api-calls/get-accounts";
import { NewUser } from "../Interfaces/forms";

interface AuthInterface {
  setUserName: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  handleClickLogin: (e: React.SyntheticEvent) => void;
  isLoggedIn: boolean;
  setNewUser: Dispatch<SetStateAction<NewUser>>;
}

const AuthContext = createContext({} as AuthInterface);




function AuthProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newUser, setNewUser] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  const handleClickLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    getAccounts().then((response) => response.json()).then(accounts => {
      for (const account of accounts) { 
        if (account.user_name.toLowerCase() === userName.toLowerCase() && account.password.toLowerCase() === password.toLowerCase()) { 
          setIsLoggedIn(true)
          break
        }
      }
     });
  
  };
  return (
    <AuthContext.Provider
      value={{ setUserName, setPassword, handleClickLogin, isLoggedIn, setNewUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthProvider;
