import { Dispatch, SetStateAction } from "react";
import { IFriendRequest } from "../providers/friends-provider";
import { INewTune } from "./feed";
export interface UserInputProps {
  name: string;
  type: string;
  id: string;
  label: string;
  state?: string;
  setUsernameInput?: React.Dispatch<React.SetStateAction<string>>;
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
  createUsername: string;
  createPassword: string;
  confirmPassword: string;
}

export interface User {
  id: number;
  username?: string;
  password?: string;
  email?: string;
  profileImg?: string;
  sentRequests?: IFriendRequest[];
  receivedRequests?: IFriendRequest[];
  createdBy?: INewTune[];
}
