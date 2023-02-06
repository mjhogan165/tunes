import React from "react";
import NewUserInput from "../../Componants/NewUserInput";
import { useAuth } from "../../providers/auth-provider";
import Button from "../../Componants/Button";
function CreateAccount() {
  const { setUserName, setPassword, handleClickLogin, isLoggedIn, setNewUser } = useAuth();
  return (
    <div>
      {" "}
      <NewUserInput
        setState={setNewUser}
        setStateProperty='newUserName'
        name="create-username"
        type="text"
        id="create-username"
        label="Create Username"
      />
      <NewUserInput
        setState={setNewUser}
        setStateProperty='newCreatePassword'
        name="create-password"
        type="text"
        id="create-password"
        label="Create Password"
      />{" "}
      <NewUserInput
        setState={setNewUser}
        setStateProperty='newConfirmPassword'
        name="confirm-password"
        type="text"
        id="confirm-password"
        label="Confirm Password"
      />{" "}
      <Button btnType="submit" label="Create Account"/>
    </div>
  );
}

export default CreateAccount;
