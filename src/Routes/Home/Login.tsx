import React, { useState, useEffect } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import UserInput from "../../Componants/UserInput";
import { useAuth } from "../../providers/auth-provider";
import { Navigate } from "react-router-dom";
import Button from "../../Componants/Button";
import { useNavigate } from "react-router-dom";

function Login() {
  const { user, handleClickLogin, isLoading } = useAuth();
  const [userNameInput, setUserNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  return (
    <section className="rounded-lg bg-white container shadow-sm mx-auto my-6 border-2 flex flex-col items-center border-transparent max-w-lg p-6 gap-6 font-normal">
      <h1 className="text-3xl font-semibold">Login</h1>
      {!isLoading && (
        <form className="flex flex-col items-center" action="">
          <UserInput
            setInput={setUserNameInput}
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
              handleClickLogin(event, userNameInput, passwordInput);
            }}
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
