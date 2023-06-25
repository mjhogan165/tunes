import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AuthProvider from "./providers/auth-provider";
import { Toaster } from "react-hot-toast";
import { getAccounts } from "./api-calls/get-accounts";
import toast from "react-hot-toast";
import { User } from "./Interfaces/user";
import { useState } from "react";

function AuthWrapper() {
  return (
    <AuthProvider>
      <Toaster />
      <Outlet />
    </AuthProvider>
  );
}

export default AuthWrapper;
