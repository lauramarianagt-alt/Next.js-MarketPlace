import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import NewAdForm from "./NewAdForm";

export default async function NewAdPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Crear anuncio
      </h1>

      <NewAdForm />
    </main>
  );
}