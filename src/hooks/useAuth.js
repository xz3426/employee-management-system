import jwt_decode from "jwt-decode";

function useAuth() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const user = jwt_decode(token);

  return user.authorization ? user.authorization : null;
}
export default useAuth;
