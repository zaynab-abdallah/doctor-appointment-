import {handleAuth} from "@kinde-oss/kinde-auth-nextjs/server";
import {NextResponse} from "next/server";

// Check if Kinde environment variables are set
const hasKindeConfig = 
  process.env.KINDE_CLIENT_ID && 
  process.env.KINDE_CLIENT_SECRET && 
  process.env.KINDE_ISSUER_URL;

export const GET = hasKindeConfig 
  ? handleAuth()
  : (req) => {
      return NextResponse.json(
        { 
          error: "Kinde authentication is not configured. Please set KINDE_CLIENT_ID, KINDE_CLIENT_SECRET, and KINDE_ISSUER_URL environment variables in Vercel.",
          setup_url: "https://app.kinde.com"
        },
        { status: 503 }
      );
    };