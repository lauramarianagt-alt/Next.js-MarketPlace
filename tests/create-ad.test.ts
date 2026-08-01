import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getSession: vi.fn(),
  create: vi.fn(),
  revalidatePath: vi.fn(),
  redirect: vi.fn(),
}));

vi.mock("@/lib/auth", () => ({
  getSession: mocks.getSession,
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    ad: {
      create: mocks.create,
    },
  },
}));

vi.mock("next/cache", () => ({
  revalidatePath: mocks.revalidatePath,
}));

vi.mock("next/navigation", () => ({
  redirect: mocks.redirect,
}));

import { createAd } from "@/app/ads/new/actions";

describe("createAd", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mocks.getSession.mockResolvedValue({
      userId: 1,
    });
  });

  it("devuelve errores y no crea el anuncio cuando los datos son inválidos", async () => {
    const formData = new FormData();

    formData.set("title", "ab");
    formData.set("description", "mal");
    formData.set("price", "0");

    const result = await createAd({}, formData);

    expect(result.errors?.title).toContain(
      "El título debe tener al menos 3 caracteres",
    );

    expect(result.errors?.description).toContain(
      "La descripción debe tener al menos 5 caracteres",
    );

    expect(result.errors?.price).toContain(
      "El precio debe ser mayor que 0",
    );

    expect(mocks.create).not.toHaveBeenCalled();
    expect(mocks.revalidatePath).not.toHaveBeenCalled();
    expect(mocks.redirect).not.toHaveBeenCalled();
  });

  it("crea el anuncio, revalida y redirige cuando los datos son válidos", async () => {
    mocks.create.mockResolvedValue({
      id: 10,
      title: "Monitor LG 27",
      description: "Monitor en muy buen estado",
      price: 180,
      ownerId: 1,
      createdAt: new Date(),
    });

    const formData = new FormData();

    formData.set("title", "Monitor LG 27");
    formData.set("description", "Monitor en muy buen estado");
    formData.set("price", "180");

    await createAd({}, formData);

    expect(mocks.create).toHaveBeenCalledOnce();

    expect(mocks.create).toHaveBeenCalledWith({
      data: {
        title: "Monitor LG 27",
        description: "Monitor en muy buen estado",
        price: 180,
        ownerId: 1,
      },
    });

    expect(mocks.revalidatePath).toHaveBeenCalledWith("/ads");
    expect(mocks.redirect).toHaveBeenCalledWith("/ads");
  });
});