import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  verifySessionToken,
  type Session,
} from "@/lib/auth-token";

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  try {
    return await verifySessionToken(token);
  } catch {
    return null;
  }
}