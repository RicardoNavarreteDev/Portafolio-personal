// src/components/ui/CardsAnimation.tsx
import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import { utils, stagger, onScroll, createTimeline, animate } from "animejs";
import "../../styles/cardsAnimation.css";

type TechIconProps = {
  label: string;
  icon: string;
};

const TechIcon: FC<TechIconProps> = ({ label, icon }) => (
  <span
    title={label}
    className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/40 border border-white/15 text-sm"
  >
    <span aria-hidden="true">{icon}</span>
    <span className="sr-only">{label}</span>
  </span>
);

type FeaturedProject = {
  id: string;
  titulo: string;
  tipo: string;
  descripcion: string;
  tecnologias: TechIconProps[];
  demoUrl?: string;
  codeUrl?: string;
};

const PROJECTS: FeaturedProject[] = [
  {
    id: "tickets",
    titulo: "Tickets De La Suerte",
    tipo: "Plataforma full-stack",
    descripcion:
      "Sistema de venta de tickets con panel de administración, generación de órdenes, validación de tickets y gestión de ganadores.",
    tecnologias: [
      { label: "React", icon: "⚛️" },
      { label: "TypeScript", icon: "🟦" },
      { label: "NestJS", icon: "🧱" },
      { label: "MySQL", icon: "🐬" },
    ],
    demoUrl: "#",
    codeUrl: "#",
  },
  {
    id: "club-interno",
    titulo: "Panel interno Club Providencia",
    tipo: "Herramienta interna",
    descripcion:
      "Módulos personalizados para reservas, pagos, reportes y automatización de tareas internas, con foco en rendimiento y seguridad.",
    tecnologias: [
      { label: "PHP", icon: "🐘" },
      { label: "WordPress", icon: "📦" },
      { label: "MySQL", icon: "🐬" },
      { label: "jQuery", icon: "✨" },
    ],
    demoUrl: "#",
    codeUrl: "#",
  },
  {
    id: "landing-saas",
    titulo: "Plataforma de reservas y clases",
    tipo: "Web app",
    descripcion:
      "Aplicación web para gestionar reservas de clases y servicios, con panel de administración y experiencia optimizada para móviles.",
    tecnologias: [
      { label: "Astro", icon: "⭐" },
      { label: "React", icon: "⚛️" },
      { label: "Node.js", icon: "🟢" },
      { label: "PostgreSQL", icon: "🐘" },
    ],
    demoUrl: "#",
    codeUrl: "#",
  },
];

const CardsAnimation: FC = () => {
  const stickyRef = useRef<HTMLElement | null>(null);
  const [isDesktop, setIsDesktop] = useState<boolean>(true);

  // Detectar ancho de pantalla (desktop vs mobile/tablet)
  useEffect(() => {
    const update = () => {
      if (typeof window === "undefined") return;
      setIsDesktop(window.innerWidth >= 1024);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Animación SOLO en desktop
  useEffect(() => {
    if (!isDesktop) return;

    const stickyEl = stickyRef.current;
    if (!stickyEl) return;

    const stackEl = stickyEl.querySelector(".stack");
    if (!stackEl) return;

    const cards = stackEl.querySelectorAll<HTMLElement>(".card");
    const fronts = stackEl.querySelectorAll<HTMLElement>(".front");
    const backs = stackEl.querySelectorAll<HTMLElement>(".back");

    const brightness = (v: number) => `brightness(${v})`;

    // Estado inicial
    utils.set(cards, {
      x: 0,
      y: 0,
      rotateY: 180,
      z: stagger(1),
    });

    // @ts-ignore
    utils.set(fronts, {
      filter: stagger([0.9, 1.05], { modifier: brightness }),
    });
    // @ts-ignore
    utils.set(backs, {
      filter: stagger([1.05, 0.9], { modifier: brightness }),
    });

    const scrollObserver = onScroll({
      target: stickyEl,
      enter: "top top",
      leave: "bottom bottom",
      sync: 0.5,
      debug: false,
    });

    const timeline = createTimeline({
      defaults: {
        ease: "linear",
        duration: 600,
        composition: "blend",
      },
      autoplay: scrollObserver,
    });

    const spacing = 340;

    // FASE 1: separan izquierda / centro / derecha
    timeline.add(
      cards,
      {
        x: (_el: unknown, i: number, total: number) => {
          const offset = -((total - 1) * spacing) / 2;
          return offset + i * spacing;
        },
        y: 0,
        duration: 600,
        ease: "out(2)",
      },
      0
    );

    // FASE 2: giran para mostrar el frente
    timeline.add(
      cards,
      {
        rotateY: [180, 0],
        duration: 600,
        ease: "inOut(2)",
      },
      600
    );

    timeline.init();

    return () => {
      // @ts-ignore
      timeline.revert?.();
    };
  }, [isDesktop]);

  const handleMouseEnter = (el: HTMLElement) => {
    animate(el, {
      y: -20,
      duration: 250,
      composition: "blend",
    });
  };

  const handleMouseLeave = (el: HTMLElement) => {
    animate(el, {
      y: 0,
      duration: 400,
      composition: "blend",
      delay: 30,
    });
  };

  // 🔹 MODO MOBILE/TABLET: SIN EFECTO, CARDS UNA BAJO OTRA
  if (!isDesktop) {
    return (
      <div className="cards-animation-root">
        <div className="flex flex-col gap-6 md:gap-7">
          {PROJECTS.map((project) => (
            <div key={project.id} className="relative group">
              {/* Estrella */}
              <div
                className="pointer-events-none absolute -top-3 -right-4 z-30
                           drop-shadow-[0_0_12px_rgba(56,189,248,0.8)]"
              >
                <span className="text-3xl" aria-hidden="true">
                  ⭐
                </span>
              </div>

              {/* Card normal (solo frente) */}
              <div
                className="relative z-10 flex h-full flex-col rounded-3xl bg-black/40 border border-white/10
                           shadow-xl shadow-black/40 overflow-hidden backdrop-blur-sm"
              >
                {/* Parte superior degradado */}
                <div className="h-28 bg-gradient-to-br from-sky-500/50 via-blue-500/40 to-purple-500/50 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-3xl" aria-hidden="true">
                      🧩
                    </span>
                    <span className="text-[11px] md:text-xs px-2 py-0.5 rounded-full bg-black/35 border border-white/10 text-white/80">
                      {project.tipo}
                    </span>
                  </div>
                </div>

                {/* Contenido */}
                <div className="flex flex-1 flex-col px-5 pt-4 pb-5 md:px-6 md:pb-6">
                  <h3 className="text-sm md:text-base font-semibold text-white mb-2">
                    {project.titulo}
                  </h3>

                  <p className="text-xs md:text-sm text-white/80 leading-relaxed mb-4 flex-1">
                    {project.descripcion}
                  </p>

                  {/* Tecnologías */}
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    {project.tecnologias.map((tech) => (
                      <TechIcon
                        key={`${project.id}-${tech.label}`}
                        label={tech.label}
                        icon={tech.icon}
                      />
                    ))}
                  </div>

                  {/* Botones */}
                  <div className="flex flex-wrap gap-2">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl
                                   bg-gradient-to-tr from-sky-500 to-blue-600 text-xs md:text-sm font-semibold text-white
                                   px-3 py-2 shadow-lg shadow-sky-500/40
                                   hover:translate-y-0.5 transition-transform duration-200"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span aria-hidden="true">🔗</span>
                        <span>Ver demo</span>
                      </a>
                    )}

                    {project.codeUrl && (
                      <a
                        href={project.codeUrl}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl
                                   border border-white/15 bg-white/5 text-xs md:text-sm font-semibold
                                   text-white px-3 py-2 hover:bg-white/10 transition-colors"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span aria-hidden="true" className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="h-5 w-5"
                            aria-hidden="true"
                          >
                            <path
                              fill="currentColor"
                              d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.6.4-1.1.7-1.3-2.5-.3-5.2-1.3-5.2-5.7 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.8 1 .8-.2 1.6-.3 2.4-.3s1.6.1 2.4.3c2-1.3 2.8-1 2.8-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.6 1 2.7 0 4.4-2.7 5.4-5.2 5.7.4.3.8 1 .8 2v3c0 .3.2.7.8.6 4.6-1.5 7.9-5.9 7.9-10.9C23.5 5.65 18.35.5 12 .5Z"
                            />
                          </svg>
                        </span>
                        <span>Ver código</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 🔹 MODO DESKTOP: EFECTO ANIME + STICKY
  return (
    <div className="cards-animation-root">
      {/* Spacer arriba (controlado por CSS) */}
      <section className="spacer spacer-top" aria-hidden="true" />

      {/* Contenedor sticky */}
      <section className="sticky-container" ref={stickyRef}>
        <div className="sticky-content">
          <div className="stack">
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                className="card group"
                onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              >
                {/* ⭐ Estrella */}
                <div
                  className="pointer-events-none absolute -top-3 -right-4 z-30
                             drop-shadow-[0_0_12px_rgba(56,189,248,0.8)]"
                >
                  <span className="text-3xl" aria-hidden="true">
                    ⭐
                  </span>
                </div>

                {/* Frente */}
                <div className="front">
                  <div
                    className="relative z-10 flex h-full flex-col rounded-3xl bg-black/40 border border-white/10
                               shadow-xl shadow-black/40 overflow-hidden backdrop-blur-sm"
                  >
                    {/* Parte superior degradado */}
                    <div className="h-28 md:h-32 bg-gradient-to-br from-sky-500/50 via-blue-500/40 to-purple-500/50 flex items-center justify-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-3xl" aria-hidden="true">
                          🧩
                        </span>
                        <span className="text-[11px] md:text-xs px-2 py-0.5 rounded-full bg-black/35 border border-white/10 text-white/80">
                          {project.tipo}
                        </span>
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="flex flex-1 flex-col px-5 pt-4 pb-5 md:px-6 md:pb-6">
                      <h3 className="text-sm md:text-base font-semibold text-white mb-2">
                        {project.titulo}
                      </h3>

                      <p className="text-xs md:text-sm text-white/80 leading-relaxed mb-4 flex-1">
                        {project.descripcion}
                      </p>

                      {/* Tecnologías */}
                      <div className="mb-4 flex flex-wrap items-center gap-2">
                        {project.tecnologias.map((tech) => (
                          <TechIcon
                            key={`${project.id}-${tech.label}`}
                            label={tech.label}
                            icon={tech.icon}
                          />
                        ))}
                      </div>

                      {/* Botones */}
                      <div className="flex flex-wrap gap-2">
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl
                                       bg-gradient-to-tr from-sky-500 to-blue-600 text-xs md:text-sm font-semibold text-white
                                       px-3 py-2 shadow-lg shadow-sky-500/40
                                       hover:translate-y-0.5 transition-transform duración-200"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <span aria-hidden="true">🔗</span>
                            <span>Ver demo</span>
                          </a>
                        )}

                        {project.codeUrl && (
                          <a
                            href={project.codeUrl}
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl
                                       border border-white/15 bg-white/5 text-xs md:text-sm font-semibold
                                       text-white px-3 py-2 hover:bg-white/10 transition-colors"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <span aria-hidden="true" className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="h-5 w-5"
                                aria-hidden="true"
                              >
                                <path
                                  fill="currentColor"
                                  d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.6.4-1.1.7-1.3-2.5-.3-5.2-1.3-5.2-5.7 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.8 1 .8-.2 1.6-.3 2.4-.3s1.6.1 2.4.3c2-1.3 2.8-1 2.8-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.6 1 2.7 0 4.4-2.7 5.4-5.2 5.7.4.3.8 1 .8 2v3c0 .3.2.7.8.6 4.6-1.5 7.9-5.9 7.9-10.9C23.5 5.65 18.35.5 12 .5Z"
                            />
                          </svg>
                        </span>
                        <span>Ver código</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Reverso */}
            <div className="back" />
          </div>
        ))}
          </div>
        </div>
      </section>

      {/* Spacer abajo */}
      <section className="spacer spacer-bottom" aria-hidden="true" />
    </div>
  );
};

export default CardsAnimation;
