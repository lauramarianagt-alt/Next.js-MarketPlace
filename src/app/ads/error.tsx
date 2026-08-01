"use client";

export default function AdsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  if (process.env.NODE_ENV === "development") {
    console.error(error);
  }
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center p-6 text-center">
      <h1 className="text-3xl font-bold">Algo ha salido mal</h1>

      <p className="mt-3 text-gray-600">No hemos podido cargar los anuncios.</p>

      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded bg-blue-600 px-4 py-2 text-white"
      >
        Intentar de nuevo
      </button>
    </main>
  );
}
