import jwt_decode from "jwt-decode";

function useAuth() {
  const token = localStorage.getItem("token");
  if (!token) return {};
  const user = jwt_decode(token);
  const authorization = user.authorization ? user.authorization : null;
  const userID = user.id;
  const username = user.username;

  return { authorization, userID, username };
}
export default useAuth;
