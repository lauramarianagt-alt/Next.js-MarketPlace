"use client";

import { useOptimistic, useTransition } from "react";
import { setFavorite } from "@/app/ads/actions";

type FavoriteButtonProps = {
  id: number;
  favorite: boolean;
};

export default function FavoriteButton({
  id,
  favorite,
}: FavoriteButtonProps) {
  const [isPending, startTransition] = useTransition();

  const [optimisticFavorite, updateOptimisticFavorite] =
    useOptimistic(
      favorite,
      (_currentFavorite, nextFavorite: boolean) => nextFavorite,
    );

  function handleClick() {
    const nextFavorite = !optimisticFavorite;

    startTransition(async () => {
      updateOptimisticFavorite(nextFavorite);
      await setFavorite(id, nextFavorite);
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-label={
        optimisticFavorite
          ? "Quitar de favoritos"
          : "Añadir a favoritos"
      }
      aria-pressed={optimisticFavorite}
      className="mt-4 text-2xl disabled:cursor-wait disabled:opacity-60"
    >
      {optimisticFavorite ? "❤️" : "🤍"}
    </button>
  );
}