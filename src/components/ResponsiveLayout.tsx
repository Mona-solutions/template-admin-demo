import type { ReactNode } from "react";

interface ResponsiveLayoutProps {
  children: ReactNode;
  background?: "gradient" | "white";
  align?: "center" | "top";
}

export default function ResponsiveLayout({
  children,
  background = "white",
  align = "top",
}: ResponsiveLayoutProps) {
  const backgroundClass =
    background === "gradient"
      ? "bg-gradient-to-b from-[#2E5B88] to-[#1C3555]"
      : "bg-white";

  // 🔹 Ajustamos para que 'top' alinee correctamente el contenido del dashboard
  const alignmentClass =
    align === "center"
      ? "items-center justify-center"
      : "items-start justify-start";

  return (
    <div
      className={`
        relative 
        w-screen min-h-screen 
        ${backgroundClass}
        overflow-x-hidden overflow-y-auto 
        flex flex-col ${alignmentClass}
      `}
    >
      {/* Contenedor principal con ancho máximo */}
      <div
        className="
          w-full max-w-[1800px]
          px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12
          text-[clamp(14px,1vw,18px)]
          flex-1
        "
      >
        {children}
      </div>
    </div>
  );
}
