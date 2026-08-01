"use server";

import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signSessionToken, SESSION_COOKIE } from "@/lib/auth-token";

export async function login(formData: FormData) {
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Credenciales incorrectas");
  }

  const passwordCorrect = await compare(
    password,
    user.passwordHash
  );

  if (!passwordCorrect) {
    throw new Error("Credenciales incorrectas");
  }

  const token = await signSessionToken(user.id);

  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  redirect("/ads");
}