

import { serialize, parse } from "cookie";
import { encrypt, decrypt } from "./encryption"; // You'll need to implement encryption functions

const COOKIE_NAME = "refreshToken";

export const setRefreshTokenCookie = (req, refreshToken) => {
  const encryptedRefreshToken = encrypt(refreshToken); // Encrypt the refresh token

  const cookieOptions = {
    httpOnly: true, // Cookie is only accessible from server-side
    secure: process.env.NODE_ENV !== "development", // Set to true in production
    sameSite: "strict", // Protects against CSRF attacks
    maxAge: 30 * 24 * 60 * 60, // Expiry time in seconds
    path: "/", // Root path
  };

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set(
    "set-cookie",
    serialize(COOKIE_NAME, encryptedRefreshToken, cookieOptions)
  );

  
};

export const getRefreshTokenCookie = (req) => {
  const cookies = parse(req.headers.cookie || "");
  const encryptedRefreshToken = cookies[COOKIE_NAME];

  if (encryptedRefreshToken) {
    return decrypt(encryptedRefreshToken); // Decrypt the refresh token
  }

  return null;
};
