// src/components/home/FeaturedProjects.tsx
import type { FC } from "react";
import CardsAnimation from "../ui/CardsAnimation";

const FeaturedProjects: FC = () => {
  return (
    <section
      id="featured-projects"
      className="pt-16 md:pt-14 lg:pt-16 pb-12 md:pb-16 lg:pb-20"
    >
      {/* Título + texto */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-3">
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              Proyectos destacados
            </span>
          </h2>
          <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto">
            Descubre algunos de mis proyectos destacados.
          </p>
        </div>
      </div>

      {/* 🔹 Aquí va tu nuevo efecto de tarjetas */}
      <div className="mt-0">
        <CardsAnimation />
      </div>

      {/* Botón "Ver todos los proyectos" */}
      <div className="mt-10 flex justify-center">
        <a
          href="/projects"
          className="inline-flex items-center gap-2 rounded-2xl px-5 md:px-7 py-2.5
                     text-xs md:text-sm font-semibold
                     bg-gradient-to-tr from-sky-500 to-blue-600 text-white
                     shadow-lg shadow-sky-500/40
                     hover:translate-y-0.5 transition-transform duration-200"
        >
          <span>Ver todos los proyectos</span>
          <span aria-hidden="true">➜</span>
        </a>
      </div>
    </section>
  );
};

export default FeaturedProjects;
