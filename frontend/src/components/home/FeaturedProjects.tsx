// src/components/home/FeaturedProjects.tsx
import type { FC } from 'react';

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
    id: 'tickets',
    titulo: 'Tickets De La Suerte',
    tipo: 'Plataforma full-stack',
    descripcion:
      'Sistema de venta de tickets con panel de administración, generación de órdenes, validación de tickets y gestión de ganadores.',
    tecnologias: [
      { label: 'React', icon: '⚛️' },
      { label: 'TypeScript', icon: '🟦' },
      { label: 'NestJS', icon: '🧱' },
      { label: 'MySQL', icon: '🐬' },
    ],
    demoUrl: '#',
    codeUrl: '#',
  },
  {
    id: 'club-interno',
    titulo: 'Panel interno Club Providencia',
    tipo: 'Herramienta interna',
    descripcion:
      'Módulos personalizados para reservas, pagos, reportes y automatización de tareas internas, con foco en rendimiento y seguridad.',
    tecnologias: [
      { label: 'PHP', icon: '🐘' },
      { label: 'WordPress', icon: '📦' },
      { label: 'MySQL', icon: '🐬' },
      { label: 'jQuery', icon: '✨' },
    ],
    demoUrl: '#',
    codeUrl: '#',
  },
  {
    id: 'landing-saas',
    titulo: 'Plataforma de reservas y clases',
    tipo: 'Web app',
    descripcion:
      'Aplicación web para gestionar reservas de clases y servicios, con panel de administración y experiencia optimizada para móviles.',
    tecnologias: [
      { label: 'Astro', icon: '⭐' },
      { label: 'React', icon: '⚛️' },
      { label: 'Node.js', icon: '🟢' },
      { label: 'PostgreSQL', icon: '🐘' },
    ],
    demoUrl: '#',
    codeUrl: '#',
  },
];

const FeaturedProjects: FC = () => {
  return (
    <section
      id="featured-projects"
      className="pt-10 md:pt-14 lg:pt-16 pb-12 md:pb-16 lg:pb-20"
    >
      <div className="max-w-6xl mx-auto px-4">

        {/* Título + texto */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-3">
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              Proyectos destacados
            </span>
          </h2>
          <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto">
            Una selección de proyectos donde he unido backend, frontend y
            seguridad para construir soluciones reales de principio a fin.
          </p>
        </div>

        {/* Grid de proyectos */}
        <div className="grid gap-6 md:gap-7 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              className="relative group"
            >
              {/* Estrella sobresaliendo arriba a la derecha (sin círculo) */}
              <div
                className="pointer-events-none absolute -top-3 -right-4 z-20
                           drop-shadow-[0_0_12px_rgba(56,189,248,0.8)]
                           transform transition-transform duration-200
                           group-hover:scale-[1.02] group-hover:-translate-y-2"
              >
                <span className="text-3xl" aria-hidden="true">
                  ⭐
                </span>
              </div>

              {/* Card real */}
              <div
                className="relative z-10 flex flex-col rounded-3xl bg-black/40 border border-white/10
                           shadow-xl shadow-black/40 overflow-hidden backdrop-blur-sm
                           transform transition-transform duration-200 ease-out
                           group-hover:-translate-y-2 group-hover:scale-[1.02] group-hover:shadow-sky-500/40"
              >
                {/* Parte superior con degradado / iconito simple */}
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

                  {/* Tecnologías como iconos solamente */}
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    {project.tecnologias.map((tech) => (
                      <TechIcon
                        key={`${project.id}-${tech.label}`}
                        label={tech.label}
                        icon={tech.icon}
                      />
                    ))}
                  </div>

                  {/* Botones de acción por proyecto */}
                  <div className="flex flex-wrap gap-2">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl
                                   bg-sky-500/90 text-xs md:text-sm font-semibold text-white
                                   px-3 py-2 shadow-md shadow-sky-500/50
                                   hover:bg-sky-400 transition-colors"
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
                      >
                        <span aria-hidden="true">💻</span>
                        <span>Ver código</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Botón "Ver todos los proyectos" con el mismo estilo que el CTA del Hero */}
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
      </div>
    </section>
  );
};

export default FeaturedProjects;
