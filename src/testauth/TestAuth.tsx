import React, { useState, createContext, useContext, useEffect } from "react";

import { childrenType } from "../Interfaces/global";

interface AuthInterface {
  logout: () => void;
}

const TestAuthContext = createContext({} as AuthInterface);

function TestAuthProvider({ children }: childrenType) {
  console.log("TestAuth Render");
  const logout = () => {
    console.log("logout()");
  };
  return (
    <TestAuthContext.Provider
      value={{
        logout,
      }}
    >
      {children}
    </TestAuthContext.Provider>
  );
}

export const useTestAuth = () => {
  return useContext(TestAuthContext);
};
export default TestAuthProvider;
