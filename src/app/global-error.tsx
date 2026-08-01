"use client";

export default function GlobalError({
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
    <html>
      <body>
        <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center p-6 text-center">
          <h1 className="text-4xl font-bold">
            Error inesperado
          </h1>

          <p className="mt-4 text-gray-600">
            Ha ocurrido un error crítico en la aplicación.
          </p>

          <button
            onClick={reset}
            className="mt-6 rounded bg-blue-600 px-4 py-2 text-white"
          >
            Intentar de nuevo
          </button>
        </main>
      </body>
    </html>
  );
}