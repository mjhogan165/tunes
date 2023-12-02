import React from "react";
import { Link } from "react-router-dom";
export default function Welcome() {
  return (
    <div>
      Welcome{" "}
      <p>
        <Link className="text-blue-500" to="/login">
          {" "}
          Login
        </Link>
      </p>
      <Link className="text-blue-500 m-2" to="/create-account">
        {" "}
        Signup
      </Link>
    </div>
  );
}
