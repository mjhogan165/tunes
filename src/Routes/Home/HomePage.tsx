import React from "react";
import Button from "../../Componants/Button";
import { useAuth } from "../../providers/auth-provider";
import { Navigate } from "react-router-dom";
function HomePage() {
  const { user } = useAuth();
  if (user) {
    console.log({ user: user });
    return <Navigate to="/dashboard/feed" replace />;
  } else return <Navigate to="/login" replace />;
}

export default HomePage;
