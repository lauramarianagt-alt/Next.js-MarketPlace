import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import FavoriteButton from "@/components/FavoriteButton";

type Props = {
  searchParams: Promise<{
    query?: string;
  }>;
};

export default async function AdsPage({ searchParams }: Props) {
  const session = await getSession();

  const { query } = await searchParams;

  const ads = await prisma.ad.findMany({
    where: query
      ? {
          title: {
            contains: query,
            mode: "insensitive",
          },
        }
      : undefined,

    orderBy: {
      createdAt: "desc",
    },
  });

  async function deleteAd(formData: FormData) {
    "use server";

    const session = await getSession();

    if (!session) {
      redirect("/login");
    }

    const id = Number(formData.get("id"));

    if (!Number.isSafeInteger(id) || id <= 0) {
      throw new Error("El identificador del anuncio no es válido");
    }

    const result = await prisma.ad.deleteMany({
      where: {
        id,
        ownerId: session.userId,
      },
    });

    if (result.count === 0) {
      throw new Error(
        "No puedes eliminar este anuncio porque no eres su propietario",
      );
    }

    revalidatePath("/ads");
    redirect("/ads");
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Anuncios</h1>
      <form className="mb-6">
        <input
          type="text"
          name="query"
          placeholder="Buscar anuncios..."
          defaultValue={query}
          className="w-full rounded-md border p-2"
        />

        <button
          type="submit"
          className="mt-2 rounded bg-blue-600 px-4 py-2 text-white"
        >
          Buscar
        </button>
      </form>

      {ads.length === 0 ? (
        <p>No hay anuncios todavía.</p>
      ) : (
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ads.map((ad) => (
            <article key={ad.id} className="rounded-lg border p-4 shadow-sm">
              <Link href={`/ads/${ad.id}`}>
                <h2 className="text-xl font-semibold hover:underline">
                  {ad.title}
                </h2>
              </Link>

              <p className="mt-2">{ad.description}</p>

              <p className="mt-4 font-bold">{ad.price.toFixed(2)} €</p>

              {session && <FavoriteButton id={ad.id} favorite={ad.favorite} />}

              {session?.userId === ad.ownerId && (
                <div className="mt-4 flex items-center gap-4">
                  <Link
                    href={`/ads/${ad.id}/edit`}
                    className="font-medium underline"
                  >
                    Editar
                  </Link>

                  <form action={deleteAd}>
                    <input type="hidden" name="id" value={ad.id} />

                    <button
                      type="submit"
                      className="font-medium text-red-500 hover:underline"
                    >
                      Eliminar
                    </button>
                  </form>
                </div>
              )}
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
