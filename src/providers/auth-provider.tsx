import React, { useState, createContext, useContext, useEffect } from "react";
import { getAccounts } from "../api-calls/get-accounts";
import { CreateUser, User } from "../Interfaces/user";
import { createNewUser } from "../api-calls/create-user";
import toast from "react-hot-toast";
import { childrenType } from "../Interfaces/global";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api-calls/login-user";

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
    }
    //getUser
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
    loginUser(usernameInput, passwordInput)
      .then((res) => {
        console.log({ res: res });
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        if (res) {
          setUser(res);
          navigate("/dashboard/feed");
        }
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
    const { createPassword, confirmPassword } = createUser;
    console.log({ createUser: createUser });
    if (createPassword === confirmPassword) {
      setIsLoading(true);
      createNewUser(createUser)
        .then((res) => {
          console.log({ res: res });
          if (res.ok) {
            return res.json();
          }
        })
        .then((user) => {
          console.log({ user: user });
          if (user) {
            setUser(user);
            navigate("/dashboard/feed");
          }
        });
    } else return toast.error("bad");
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
