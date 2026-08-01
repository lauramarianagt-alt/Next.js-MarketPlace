"use server";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function setFavorite(
  id: number,
  favorite: boolean,
): Promise<void> {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new Error("El identificador del anuncio no es válido");
  }

  await prisma.ad.update({
    where: {
      id,
    },
    data: {
      favorite,
    },
  });

  revalidatePath("/ads");
  revalidatePath(`/ads/${id}`);
}