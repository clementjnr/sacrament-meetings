
import { headers } from "next/headers";

export async function getApiBaseUrl(): Promise<string> {
  // Vercel provides the hostname for the current deployment.
  const vercelUrl = process.env.VERCEL_URL;

  if (vercelUrl) {
    return `https://${vercelUrl}`;
  }

  // Local development fallback.
  const requestHeaders = await headers();

  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";

  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.includes("localhost") ? "http" : "https");

  return `${protocol}://${host}`;
}
