export const DOMAIN = "http://117.1.29.215:4000/api/anotepad";
export const DOMAIN_FE = 'http://localhost:3000/'
export const TOKEN = "accessToken";
export const USER_LOGIN = "USER_LOGIN";
const currentUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
  