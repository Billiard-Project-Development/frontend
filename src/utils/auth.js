import { parseCookies } from "nookies";
import nookies from "nookies";
import { jwtDecode } from "jwt-decode";

export const getToken = (ctx = {}) => {
  const cookies = parseCookies(ctx);
  return cookies.access_token ?? null;
};

export const getUserInfo = (ctx = {}) => {
  const cookies = nookies.get(ctx);
  const token = cookies.access_token ?? null;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      // Assuming the user information is stored under `user` in the JWT payload
      return decodedToken.user;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
  return null;
};

// Function to handle logout
export const handleLogout = (navigate) => {
  // Destroy the access token cookie
  nookies.destroy(null, "access_token");
  // Optionally destroy other related cookies
  // nookies.destroy(null, 'refresh_token');
  // Redirect to sign-in page
  navigate("/sign-in");
};
