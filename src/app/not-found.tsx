import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center p-6 text-center">
      <h1 className="text-5xl font-bold">404</h1>

      <h2 className="mt-4 text-2xl font-semibold">
        Página no encontrada
      </h2>

      <p className="mt-2 text-gray-600">
        El recurso que buscas no existe o ha sido eliminado.
      </p>

      <Link
        href="/ads"
        className="mt-6 rounded bg-blue-600 px-4 py-2 text-white"
      >
        Volver a los anuncios
      </Link>
    </main>
  );
}