import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <ul className="flex gap-4">
        <li>
          <Link href="/">Inicio</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/ads">Anuncios</Link>
        </li>
        <li>
          <Link href="/ads/new">Publicar anuncio</Link>
        </li>
      </ul>
    </nav>
  );
}
