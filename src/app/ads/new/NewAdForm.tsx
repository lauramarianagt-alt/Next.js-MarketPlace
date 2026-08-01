"use client";

import Button from "@/components/Button";
import FormField from "@/components/FormField";
import { useActionState } from "react";
import { createAd, type CreateAdState } from "./actions";

const initialState: CreateAdState = {};

export default function NewAdForm() {
  const [state, formAction, isPending] = useActionState(createAd, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <FormField
          label="Título"
          type="text"
          name="title"
          id="title"
          placeholder="Ejemplo: MacBook Air M2"
        />

        {state.errors?.title?.map((error) => (
          <p key={error} className="mt-1 text-sm text-red-500">
            {error}
          </p>
        ))}
      </div>

      <div>
        <FormField
          label="Descripción"
          type="text"
          name="description"
          id="description"
          placeholder="Describe el estado del producto"
        />

        {state.errors?.description?.map((error) => (
          <p key={error} className="mt-1 text-sm text-red-500">
            {error}
          </p>
        ))}
      </div>

      <div>
        <FormField
          label="Precio"
          type="number"
          name="price"
          id="price"
          placeholder="Ejemplo: 950"
        />

        {state.errors?.price?.map((error) => (
          <p key={error} className="mt-1 text-sm text-red-500">
            {error}
          </p>
        ))}
      </div>

      {state.errors?.form?.map((error) => (
        <p key={error} className="text-sm text-red-500">
          {error}
        </p>
      ))}

      <Button className="w-full" disabled={isPending}>
        {isPending ? "Publicando..." : "Publicar anuncio"}
      </Button>
    </form>
  );
}
