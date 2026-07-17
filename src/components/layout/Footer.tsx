import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#FFE6BF] border-t border-[#FFD4A3] mt-20">

      <div className="max-w-7xl mx-auto px-8 py-10">

        <h2 className="text-2xl font-bold text-black">
          Sol y Vida Cuidados
        </h2>

        <p className="mt-3 text-black">
          Servicios de atención domiciliaria profesional.
        </p>

        <p className="mt-2 text-black">
          Protección de Datos incluida.
        </p>

        <p className="mt-2 text-black">
          Servicios <strong>VITALY</strong>: PRL + Vigilancia de la Salud.
        </p>

        <div className="border-t border-[#FFD4A3] mt-8 pt-5">

          <p className="text-black">
            © 2026 Sol y Vida Cuidados
          </p>

        </div>

      </div>

    </footer>
  );
}