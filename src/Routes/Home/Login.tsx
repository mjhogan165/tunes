import React, { useState } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import Input from "../../Componants/Input";
import { useAuth } from "../../providers/auth-provider";
import { Navigate } from "react-router-dom";
import Button from "../../Componants/Button";
function Login() {
  const { setUserName, setPassword, handleClickLogin, isLoggedIn } = useAuth();

  return (
    <div className="flex flex-col">
      <section className="container mx-auto my-6 border-2 flex flex-col items-center border-gray-500 max-w-lg p-6 gap-6 font-normal">
        <h1 className="text-4xl font-semibold">Login</h1>
        <form className="flex flex-col items-center" action="">
          <Input
            setState={setUserName}
            name="username"
            type="text"
            id="username"
            label="Username"
          />
          <Input
            setState={setPassword}
            name="password"
            type="text"
            id="password"
            label="Password"
          />
          <Button label="Login" btnType="submit" />
          {isLoggedIn && <Navigate to="/User" replace={true} />}
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
