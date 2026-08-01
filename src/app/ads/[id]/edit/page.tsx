import Button from "@/components/Button";
import FormField from "@/components/FormField";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

type EditAdPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditAdPage({ params }: EditAdPageProps) {
  const { id } = await params;
  const adId = Number(id);

  if (!Number.isInteger(adId)) {
    notFound();
  }

  const ad = await prisma.ad.findUnique({
    where: {
      id: adId,
    },
  });

  if (!ad) {
    notFound();
  }

  async function updateAd(formData: FormData) {
    "use server";

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

    await prisma.ad.update({
      where: {
        id: adId,
      },
      data: {
        title: title.trim(),
        description: description.trim(),
        price: numericPrice,
      },
    });

    redirect("/ads");
  }

  return (
    <article key={ad.id} className="rounded-lg border p-4 shadow-sm">
      <h2 className="text-xl font-semibold">{ad.title}</h2>

      <p className="mt-2 text-gray-600">{ad.description}</p>

      <p className="mt-4 text-lg font-bold">{ad.price.toFixed(2)} €</p>

      <Link
        href={`/ads/${ad.id}/edit`}
        className="mt-4 inline-block font-medium underline"
      >
        Editar
      </Link>
    </article>
  );
}
