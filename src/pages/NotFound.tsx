import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Seo from "../components/seo/Seo";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#ECFAF8_0%,#F7FCFB_45%,#FFFFFF_100%)]">
      <Seo path="/404" noindex title="Página no encontrada | Sol y Vida Care" description="La página que buscas no existe." />
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <Header />
      </div>
      <main className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-4xl font-bold text-[#1F2937]">Página no encontrada</h1>
        <p className="mt-4 text-[#4B5563]">La dirección que has abierto no existe o ha cambiado.</p>
        <Link to="/" className="mt-8 inline-block rounded-2xl bg-[#0F9E98] px-6 py-3 font-semibold text-white">
          Volver al inicio
        </Link>
      </main>
      <Footer />
    </div>
  );
}
