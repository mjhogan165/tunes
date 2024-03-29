import { Dispatch, SetStateAction } from "react";

export interface UserInputProps {
  name: string;
  type: string;
  id: string;
  label: string;
  state?: string;
  setUserNameInput?: React.Dispatch<React.SetStateAction<string>>;
  setPasswordInput?: React.Dispatch<React.SetStateAction<string>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  input?: string;
}

export interface CreateUserInputProps {
  name: string;
  type: string;
  id: string;
  label: string;
  state?: CreateUser;
  setState: Dispatch<SetStateAction<CreateUser>>;
  setStateProperty: string;
}
export interface CreateUser {
  createUserName: string;
  createPassword: string;
  confirmPassword: string;
}

export interface User {
  userName: string;
  password: string;
  profileImg?: string;
  id: number;
}
