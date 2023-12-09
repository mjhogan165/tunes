import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserInput from "../../Componants/UserInput";
import { useAuth } from "../../providers/auth-provider";
import Button from "../../Componants/Button";
import { useEffect } from "react";

function Login() {
  const { handleClickLogin, isLoading } = useAuth();
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  console.log("Render: LoginPage");

  return (
    <section className="rounded-lg bg-white container shadow-sm mx-auto my-6 border-2 flex flex-col items-center border-transparent max-w-lg p-6 gap-6 font-normal">
      <h1 className="text-3xl font-semibold">Login</h1>
      {!isLoading && (
        <form className="flex flex-col items-center" action="">
          <UserInput
            setInput={setUsernameInput}
            name="userName"
            type="text"
            id="username"
            label="Username"
          />
          <UserInput
            setInput={setPasswordInput}
            name="password"
            type="text"
            id="password"
            label="Password"
          />
          <Button
            btnType="submit"
            label="Login"
            handleClick={(event) => {
              handleClickLogin(event, usernameInput, passwordInput);
            }}
            disabled={false}
          />
          <p>
            Not a member?
            <Link className="text-blue-500" to="/create-account">
              {" "}
              Signup
            </Link>
          </p>
        </form>
      )}
    </section>
  );
}

export default Login;
