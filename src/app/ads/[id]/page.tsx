import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdDetailPage({ params }: Props) {
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

  if (!ad) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-4 text-3xl font-bold">{ad.title}</h1>
      <p className="mb-4">{ad.description}</p>
      <p className="text-xl font-semibold">{ad.price.toFixed(2)} €</p>
    </main>
  );
}