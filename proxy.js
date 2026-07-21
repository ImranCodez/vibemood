import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Get access token from cookies
  const token = request.cookies.get("accessToken")?.value;

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  try {
    // Verify JWT
    const { payload } = await jwtVerify(token, SECRET);

    // Check admin role
    if (payload.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("JWT Verification Failed:", error.message);

    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

// Protect only admin routes
export const config = {
  matcher: ["/admin/:path*"],
};