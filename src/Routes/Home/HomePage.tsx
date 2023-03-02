import React from "react";
import Button from "../../Componants/Button";
import { useAuth } from "../../providers/auth-provider";
import { Navigate } from "react-router-dom";
function HomePage() {
  const { user } = useAuth();
  console.log("hompage");
  if (user) {
    return <Navigate to="/dashboard" replace />;
  } else return <Navigate to="/" replace />;
  return <div>cunt</div>;
}

export default HomePage;
