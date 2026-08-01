import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { id } = await params;

  const ad = await prisma.ad.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!ad) {
    return {
      title: "Anuncio no encontrado",
    };
  }

  return {
    title: `${ad.title} - ${ad.price.toFixed(2)} €`,
    description: ad.description,
  };
}

export default async function AdDetailPage({ params }: Props) {
  const { id } = await params;

  const ad = await prisma.ad.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!ad) {
    return <h1>Anuncio no encontrado</h1>;
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-4 text-3xl font-bold">{ad.title}</h1>

      <p className="mb-4">{ad.description}</p>

      <p className="text-xl font-semibold">{ad.price.toFixed(2)} €</p>
    </main>
  );
}