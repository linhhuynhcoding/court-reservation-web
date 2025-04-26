import { HttpError } from "@/lib/http";

export async function POST(request: Request) {
  try {
    return Response.json({}, {
      status: 200,
      headers: {
        // "Set-Cookie": `access_token=${accessToken}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=3600`,
        "Set-Cookie": `access_token=; Path=/; Max-Age=3600`,
        "Content-Type": "application/json",
      },
    })
  }
  catch (e) {
    console.log("🚀 ~ file: route.ts:20 ~ POST ~ e:", e);
    if (e instanceof HttpError) {
      return new Response(JSON.stringify(e.payload), {
        status: e.status,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify(e), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });

  }
}