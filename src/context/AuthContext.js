import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <AuthContext.Provider value={{ test }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
