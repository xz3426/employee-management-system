import { useState } from "react";
import jwt_decode from "jwt-decode";

function useAuth() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const isAuthenticated = () => !!token;

  const authorization = () => {
    const user = jwt_decode(token);
    return user.authorization;
  };

  return {
    token,
    login,
    logout,
    isAuthenticated,
    authorization,
  };
}
export default useAuth;
