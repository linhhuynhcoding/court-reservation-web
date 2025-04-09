import authApi from "@/apis/auth";
import { HttpError } from "@/lib/http";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("nlogin: " + body);
  try {
    const response = await authApi.slogin(body);

    const { accessToken, refreshToken, ...rest } = 
    { ...response.payload.data };

    return Response.json(response, {
      status: 200,
      headers: {
        // "Set-Cookie": `access_token=${accessToken}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=3600`,
        "Set-Cookie": `access_token=${accessToken}; Path=/; Max-Age=3600`,

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