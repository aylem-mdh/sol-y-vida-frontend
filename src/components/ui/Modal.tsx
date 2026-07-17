import { useEffect } from "react";
import type { ReactNode } from "react";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({
  open,
  title,
  children,
  onClose,
}: Props) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (open) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "auto";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl"
      >
        <div className="flex justify-between items-center border-b px-8 py-6">
          <h2 className="text-3xl font-bold text-slate-800">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl hover:bg-slate-100 transition flex items-center justify-center"
          >
            <X size={22} />
          </button>
        </div>

        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}