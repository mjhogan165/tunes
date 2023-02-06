import { Dispatch, SetStateAction } from "react";

export interface InputProps {
  name: string;
  type: string;
  id: string;
  label: string;
  state?: string;
  setState: Dispatch<SetStateAction<string>>;
}

export interface NewUserInputProps {
  name: string;
  type: string;
  id: string;
  label: string;
  state?: NewUser;
  setState: Dispatch<SetStateAction<NewUser>>;
  setStateProperty: string
}
export interface NewUser {
  newUserName: string;
  newCreatePassword: string;
  newConfirmPassword: string;
}
