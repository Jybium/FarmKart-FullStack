// File: axiosInterceptor.js
import { privateRequest } from "../../../axios";
import { getCookie } from "cookies-next";
import { serialize } from "cookie";


// Axios interceptor to attach the JWT token to every outgoing request
privateRequest.interceptors.request.use((config) => {
  const token = getCookie("token"); // Replace with your actual JWT token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Axios interceptor to handle token refresh logic
privateRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // TODO: Implement token refresh logic here
        // Example: Call an API endpoint to refresh the token

        // const refreshedToken = await refreshAuthToken();
       const serialized = serialize("token", refreshedToken, {
         httpOnly: true,
          maxAge: 60 * 60 * 24,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          path: "/",
      })

        // Retry the original request with the new token
        originalRequest.headers.Authorization = "Bearer " + refreshedToken;
        return privateRequest(originalRequest);
      } catch (refreshError) {
        // TODO: Handle token refresh error (e.g., redirect to login)
        router.push("/")
        console.error("Token refresh error:", refreshError);
        throw refreshError;
      }
    }

    // Pass the error along if it's not an unauthorized error or the token refresh fails
    throw error;
  }
);
