import Button from "@/components/Button";
import FormField from "@/components/FormField";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function NewAdPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  async function createAd(formData: FormData) {
    "use server";

    const actionSession = await getSession();

    if (!actionSession) {
      redirect("/login");
    }

    const title = formData.get("title");
    const description = formData.get("description");
    const price = formData.get("price");

    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof price !== "string"
    ) {
      throw new Error("Los datos del formulario no son válidos");
    }

    const numericPrice = Number(price);

    if (
      title.trim().length < 3 ||
      description.trim().length < 5 ||
      !Number.isFinite(numericPrice) ||
      numericPrice <= 0
    ) {
      throw new Error("Revisa los datos del anuncio");
    }

    await prisma.ad.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        price: numericPrice,
        ownerId: actionSession.userId,
      },
    });

    revalidatePath("/ads");
    redirect("/ads");
  }

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Crear anuncio</h1>

      <form action={createAd} className="flex flex-col gap-4">
        <FormField
          label="Título"
          type="text"
          name="title"
          id="title"
          placeholder="Ejemplo: MacBook Air M2"
        />

        <FormField
          label="Descripción"
          type="text"
          name="description"
          id="description"
          placeholder="Describe el estado del producto"
        />

        <FormField
          label="Precio"
          type="number"
          name="price"
          id="price"
          placeholder="Ejemplo: 950"
        />

        <Button className="w-full">Publicar anuncio</Button>
      </form>
    </main>
  );
}