"use server";

import { SESSION_COOKIE } from "@/lib/auth-token";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_COOKIE);

  redirect("/login");
}