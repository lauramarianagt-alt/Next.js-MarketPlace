import { logout } from "@/app/logout/actions";
import { getSession } from "@/lib/auth";
import Link from "next/link";

export default async function Navbar() {
  const session = await getSession();

  return (
    <header className="border-b">
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link href="/ads" className="text-xl font-bold">
          Advertisement Marketplace
        </Link>

        <div className="flex items-center gap-5">
          <Link href="/ads">Anuncios</Link>

          {session ? (
            <>
              <Link href="/ads/new">Publicar anuncio</Link>

              <form action={logout}>
                <button
                  type="submit"
                  className="font-medium hover:underline"
                >
                  Cerrar sesión
                </button>
              </form>
            </>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
}