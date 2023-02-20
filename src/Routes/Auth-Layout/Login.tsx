import React, { useState } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import UserInput from "../../Componants/UserInput";
import { useAuth } from "../../providers/auth-provider";
import { Navigate } from "react-router-dom";
import Button from "../../Componants/Button";

function Login() {
  const { user, handleClickLogin } = useAuth();
  const [userNameInput, setUserNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  return (
    <div className="flex flex-col">
      <section className="container mx-auto my-6 border-2 flex flex-col items-center border-gray-500 max-w-lg p-6 gap-6 font-normal">
        <h1 className="text-4xl font-semibold">Login</h1>
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
          {user && <Navigate to="/Home/Feed" replace={true} />}
        </form>
        <p>
          Not a member?
          <Link className="text-blue-500" to="CreateAccount">
            {" "}
            Signup
          </Link>
        </p>
        <Outlet />
      </section>
    </div>
  );
}

export default Login;
