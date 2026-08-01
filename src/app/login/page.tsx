import Button from "@/components/Button";
import FormField from "@/components/FormField";
import { login } from "./actions";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <form action={login} className="flex flex-col gap-4">
        <FormField
          label="Email"
          type="email"
          name="email"
          id="email"
          placeholder="Introduce tu email"
        />

        <FormField
          label="Contraseña"
          type="password"
          name="password"
          id="password"
          placeholder="Introduce tu contraseña"
        />

        <Button className="w-full">
          Iniciar sesión
        </Button>
      </form>
    </main>
  );
}