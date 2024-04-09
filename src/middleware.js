import { NextResponse } from "next/server";
import { verifyRefreshJWT, verifyAccessJWT } from "./app/helpers/jwt";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import cookie, { serialize } from "cookie";


export const config = {
  matcher: ["/sell-2", "/sell", "/profile","/cart", "/checkout", "/profile/edit-profile", "/api/auth/me", "/api/cart", "/api/profile", "/api/order","/payment-successful", "/api/order","/api/payment" ],
};

export async function middleware(request, res) {

  const currentUrl = request.url;

  const cookie = request.cookies.get("token")?.value;
  const refreshCookie = request.cookies.get("refreshToken")?.value;
 
  const url = request.nextUrl.clone();
  url.pathname = `/login?redirect=${encodeURI(currentUrl)}`;

  // TO CHECK IF THE TOKEN IS VALID
  let verified;

  try {
   verified = await verifyAccessJWT(cookie);

  } catch (error) {
    console.log(error)
    

  let result
  if (!verified) {
    try{
      const refreshToken = await verifyRefreshJWT(refreshCookie)
      if(refreshToken){
       result = await fetch("/api/refresh-token", {
        method: "GET"
       }).then(res => res.json())
       
      }
    } catch(error){
      return (
        NextResponse.json({ message: "Unauthorised request" }, { status: 401 }),
        NextResponse.redirect(encodeURI(url).replace("%253F", "?"))
      );
    }
  }
  }
  // Setting cookies on the response using the `ResponseCookies` API
  const response = NextResponse.next();

  const serialized = serialize("token", String(cookie), {
    httpOnly: true,
    maxAge: 60 * 60,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    path: "/",
  });

  const refreshTokenSerialized = serialize("refreshToken", String(refreshCookie), {
    httpOnly: true,
    maxAge: 60 * 60 *24,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    path: "/",
  });

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("set-cookie", [serialized, refreshTokenSerialized]);



  return response;
}





