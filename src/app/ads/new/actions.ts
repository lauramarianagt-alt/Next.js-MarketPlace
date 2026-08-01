"use server";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const adSchema = z.object({
  title: z.string().trim().min(3, "El título debe tener al menos 3 caracteres"),
  description: z
    .string()
    .trim()
    .min(5, "La descripción debe tener al menos 5 caracteres"),
  price: z.coerce.number().positive("El precio debe ser mayor que 0"),
});

export type CreateAdState = {
  errors?: {
    title?: string[];
    description?: string[];
    price?: string[];
    form?: string[];
  };
};

export async function createAd(
  _previousState: CreateAdState,
  formData: FormData,
): Promise<CreateAdState> {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const validation = adSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
  });

  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors;

    return {
      errors: {
        title: errors.title,
        description: errors.description,
        price: errors.price,
      },
    };
  }

  try {
    await prisma.ad.create({
      data: {
        ...validation.data,
        ownerId: session.userId,
      },
    });
  } catch {
    return {
      errors: {
        form: ["No se ha podido crear el anuncio"],
      },
    };
  }

  revalidatePath("/ads");
  redirect("/ads");
}