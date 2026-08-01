import Button from "@/components/Button";
import FormField from "@/components/FormField";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

type EditAdPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditAdPage({
  params,
}: EditAdPageProps) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const { id } = await params;
  const adId = Number(id);

  if (!Number.isSafeInteger(adId) || adId <= 0) {
    notFound();
  }

  const ad = await prisma.ad.findUnique({
    where: {
      id: adId,
    },
  });

  if (!ad || ad.ownerId !== session.userId) {
    notFound();
  }

  async function updateAd(formData: FormData) {
    "use server";

    // La autorización debe repetirse dentro de la mutación.
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

    const normalizedTitle = title.trim();
    const normalizedDescription = description.trim();
    const numericPrice = Number(price);

    if (
      normalizedTitle.length < 3 ||
      normalizedDescription.length < 5 ||
      !Number.isFinite(numericPrice) ||
      numericPrice <= 0
    ) {
      throw new Error("Revisa los datos del anuncio");
    }

    const result = await prisma.ad.updateMany({
      where: {
        id: adId,
        ownerId: actionSession.userId,
      },
      data: {
        title: normalizedTitle,
        description: normalizedDescription,
        price: numericPrice,
      },
    });

    if (result.count === 0) {
      throw new Error(
        "No puedes editar este anuncio porque no eres su propietario",
      );
    }

    revalidatePath("/ads");
    revalidatePath(`/ads/${adId}`);

    redirect(`/ads/${adId}`);
  }

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Editar anuncio
      </h1>

      <form
        action={updateAd}
        className="flex flex-col gap-4"
      >
        <FormField
          label="Título"
          type="text"
          name="title"
          id="title"
          placeholder="Título del anuncio"
          defaultValue={ad.title}
        />

        <FormField
          label="Descripción"
          type="text"
          name="description"
          id="description"
          placeholder="Descripción del anuncio"
          defaultValue={ad.description}
        />

        <FormField
          label="Precio"
          type="number"
          name="price"
          id="price"
          placeholder="Precio"
          defaultValue={ad.price}
        />

        <Button className="w-full">
          Guardar cambios
        </Button>
      </form>

      <Link
        href={`/ads/${ad.id}`}
        className="mt-4 inline-block font-medium underline"
      >
        Cancelar
      </Link>
    </main>
  );
}