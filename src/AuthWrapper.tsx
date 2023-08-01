import React from "react";
import { Outlet } from "react-router-dom";
import AuthProvider from "./providers/auth-provider";
import { Toaster } from "react-hot-toast";

function AuthWrapper() {
  return (
    <AuthProvider>
      <Toaster />
      <Outlet />
    </AuthProvider>
  );
}

export default AuthWrapper;
