import React, { useState, createContext, useContext, useEffect } from "react";
import { getAccounts } from "../api-calls/get-accounts";
import { CreateUser, User } from "../Interfaces/user";
import { createAccount } from "../api-calls/create-account";
import toast from "react-hot-toast";
import { childrenType } from "../Interfaces/global";
import { useNavigate } from "react-router-dom";

interface AuthInterface {
  handleClickLogin: (
    e: React.SyntheticEvent,
    usernameInput: string,
    passwordInput: string
  ) => void;
  isLoading: boolean;
  user: User | null;
  handleClickCreateAccount: (
    e: React.SyntheticEvent,
    createUser: CreateUser
  ) => void;
  logout: () => void;
}

const AuthContext = createContext({} as AuthInterface);

function AuthProvider({ children }: childrenType) {
  const [user, setUser] = useState<null | User>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const maybeUser = localStorage.getItem("user");
    if (maybeUser) {
      const parsedUser: User = JSON.parse(maybeUser);
      setUser(parsedUser);
      // console.log(parsedUser);
    }
    //   getAccounts()
    //     .then((response) => {
    //       if (response.ok) {
    //         return response.json();
    //       }
    //     })
    //     .then((accounts) => {
    //       setIsLoading(false);
    //       const foundUser: User = accounts.find(
    //         (elm: User) => elm.username === parsedUser.username
    //       );
    //       if (foundUser) {
    //         setUser(foundUser);
    //       }
    //     })
    //     .catch((err) => {
    //       toast.error(err.toString());
    //     })
    //     .finally(() => setIsLoading(false));
    // } else {
    //   setUser(null);
    // }
  }, []);
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  const handleClickLogin = (
    e: React.SyntheticEvent,
    usernameInput: string,
    passwordInput: string
  ) => {
    e.preventDefault();
    setIsLoading(true);
    localStorage.setItem("token", "");
    getAccounts()
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((accounts) => {
        setIsLoading(false);
        console.log(accounts);
        const foundUser: User = accounts.find(
          (elm: User) => elm.username === usernameInput
        );
        if (!foundUser) {
          toast.error("username not found");
        } else if (foundUser.password === passwordInput) {
          toast.success("Success!");
          localStorage.setItem("user", JSON.stringify(foundUser));
          setUser(foundUser);
          navigate("/dashboard");
        } else toast.error("invalid password");
      })
      .catch((err) => {
        toast.error(err.toString());
      })
      .finally(() => setIsLoading(false));
  };
  const handleClickCreateAccount = (
    e: React.SyntheticEvent,
    createUser: CreateUser
  ) => {
    e.preventDefault();
    if (createUser.createPassword === createUser.confirmPassword) {
      setIsLoading(true);
      createAccount(createUser)
        .then((response) => response.json())
        .then((createdUser) => {
          localStorage.setItem("user", JSON.stringify(createdUser));
          setUser(createdUser);
        })
        .finally(() => setIsLoading(false))
        .catch((err) => {
          toast.error(err.toString());
        });
    } else toast.error("passwords do not match");
  };
  return (
    <AuthContext.Provider
      value={{
        handleClickLogin,
        isLoading,
        handleClickCreateAccount,
        user,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useRequiredUser = () => {
  const { user } = useAuth();
  if (!user) {
    throw new Error("user not logged in error");
  }
  return user;
};

export default AuthProvider;
