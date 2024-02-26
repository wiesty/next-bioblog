import { NextResponse } from "next/server";
import reloadCache from "@/lib/reloadcache";

export async function GET(request: { headers: { get: (arg0: string) => any; }; }) {
    const apiKey = request.headers.get('Authorization');
    if (apiKey !== process.env.CACHE_API_KEY) {
        return new NextResponse("not authorized", { status: 403 });
    }

    const result = await reloadCache();

    return new NextResponse(result, { status: 200 });
}
