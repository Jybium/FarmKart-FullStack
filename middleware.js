import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import cookie, { serialize } from "cookie";

export const config = {
  matcher: ["/products", "/products/:id", "/sell", "/sell-2", "/profile"],
};

export function middleware(request, res) {
  const currentUrl = request.url;
  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  // const cookie = request.cookies.get("set-cookie");
  const cookie = request.cookies.get("token");
  //    console.log("this is the cookie", cookie); // => { name: 'nextjs', value: 'fast', Path: '/' }

  const url = request.nextUrl.clone();
  url.pathname = `/login?redirect=${encodeURI(currentUrl)}`;

  if (!cookie || cookie === " ") {
    return (
      NextResponse.json({ message: "Unauthorised request" }, { status: 401 }), NextResponse.redirect(encodeURI(url).replace('%253F', "?"))
    );
    
  }

  // Setting cookies on the response using the `ResponseCookies` API
  const response = NextResponse.next();

  console.log(cookie.value); // => { name: 'vercel', value: 'fast', Path: '/' }
  // The outgoing response will have a `Set-Cookie:vercel=fast;path=/` header.

  const serialized = serialize("token", String(cookie.value), {
    httpOnly: true,
    maxAge: 60 * 60 *24 ,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    path: "/",
  });

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("set-cookie", serialized);

  console.log(requestHeaders);

  return response;
}
