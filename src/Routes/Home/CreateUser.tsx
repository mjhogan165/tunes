import React from "react";
import { useState } from "react";
import CreateUserInput from "../../Componants/CreateUserInput";
import { useAuth } from "../../providers/auth-provider";
import Button from "../../Componants/Button";
import { Navigate } from "react-router-dom";
import { CreateUser } from "../../Interfaces/forms";

function CreateAccount() {
  const { handleClickCreateAccount, user } = useAuth();
  const [createUser, setCreateUser] = useState({} as CreateUser);
  return (
    <form className="container mx-auto my-6 border-2 flex flex-col items-center border-gray-500 max-w-lg p-6 gap-6 font-normal">
      <h1 className="font-semibold text-4xl">Create New Account</h1>{" "}
      <CreateUserInput
        setState={setCreateUser}
        setStateProperty="createUserName"
        name="create-username"
        type="text"
        id="create-username"
        label="Create Username"
      />
      <CreateUserInput
        setState={setCreateUser}
        setStateProperty="createPassword"
        name="create-password"
        type="text"
        id="create-password"
        label="Create Password"
      />{" "}
      <CreateUserInput
        setState={setCreateUser}
        setStateProperty="confirmPassword"
        name="confirm-password"
        type="text"
        id="confirm-password"
        label="Confirm Password"
      />{" "}
      {/* <button
        className="bg-indigo-400 border-2 rounded-md p-2 my-4 w-40 text-center"
        type="submit"
        onClick={(e) => handleClickCreateAccount(e, createUser)}
      >
        Create Account
      </button> */}
      <Button
        btnType="submit"
        label="Create Account"
        handleClick={(e) => handleClickCreateAccount(e, createUser)}
      />
      {user && <Navigate to="/" replace={true} />}
    </form>
  );
}

export default CreateAccount;
