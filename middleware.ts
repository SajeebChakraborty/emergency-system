import * as jose from "jose";
import { NextRequest, NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const bearerToken = request.headers.get("authorization") as string;
    const key = await process.env.JWT_SECRET
    const srcky = await new TextEncoder().encode(key)

    const pathName = request.nextUrl.pathname;
    const is_admin = pathName.substring(0, 7) === '/admin/';
    if (is_admin) {
        
    } else {
        if (!bearerToken) {
            return new NextResponse(JSON.stringify({error: "Bearer Token Not Defined"}))
        }

        const token = bearerToken.split(' ')[1];
        try {
            await jose.jwtVerify(token, srcky)
        } catch (error) {
            return new NextResponse(JSON.stringify({error: "Bearer Token Not incorrect"}))
        }
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
       
    ]
}
