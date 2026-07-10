import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const role = req.nextauth.token?.role;
        console.log(role)
        if (role !== 'admin') {
            return NextResponse.redirect(new URL('/shop', req.url))
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        }
    }
)

export const config = {
    matcher: ["/adminDashboard/:path*"],
};