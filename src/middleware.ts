// app/middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"; // Importa a função getToken para obter o JWT
import { NextRequest } from "next/server"; // Importa NextRequest


export const config = {
  matcher: ["/dashboard/:path*" ,"/"],
};
export default async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET }) 
  
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url)); 
  }  
  
  return NextResponse.next();
}
