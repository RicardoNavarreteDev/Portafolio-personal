// src/components/home/ExperienceTimeline.tsx
import type { FC } from 'react';

type ExperienceItem = {
  id: string;
  cargo: string;
  empresa: string;
  empresaUrl?: string;
  periodo: string;
  ubicacion: string;
  descripcion: string;
  logros: string[];
};

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'club-providencia',
    cargo: 'Desarrollador Web / Fullstack',
    empresa: 'Club Providencia',
    empresaUrl: 'https://www.clubprovidencia.cl',
    periodo: '2021 – 2024',
    ubicacion: 'Santiago, Chile',
    descripcion:
      'Desarrollo y mantenimiento de plataformas internas y sitios web del club, con foco en rendimiento, seguridad y automatización de procesos.',
    logros: [
      'Implementación y mejora de módulos personalizados en PHP, WordPress y MySQL.',
      'Optimización de procesos de reservas, pagos y reportes internos.',
      'Refuerzo de la seguridad de distintos sitios (endpoints, directorios sensibles, hardening).',
    ],
  },
  {
    id: 'freelance',
    cargo: 'Desarrollador Freelance & Proyectos personales',
    empresa: 'Proyectos propios y clientes independientes',
    periodo: '2024 – Presente',
    ubicacion: 'Remoto',
    descripcion:
      'Diseño y desarrollo de aplicaciones web modernas, desde landing pages hasta sistemas más completos, combinando frontend y backend.',
    logros: [
      'Desarrollo de proyectos con TypeScript, React, Astro, Node.js, NestJS, MySQL, PostgreSQL, MongoDB.',
      'Integración de pagos, paneles de administración y sistemas de tickets.',
      'Aprendizaje continuo de nuevas tecnologías y buenas prácticas de arquitectura.',
    ],
  },
  // Cuando quieras agregar más, simplemente añade otro objeto aquí.
];

const ExperienceCard: FC<{ item: ExperienceItem; invertida?: boolean }> = ({
  item,
  invertida = false,
}) => {
  return (
    <div
      className={`relative w-full max-w-xl mx-auto lg:mx-0 ${
        invertida ? 'lg:ml-auto lg:pl-10' : 'lg:mr-auto lg:pr-10'
      }`}
    >
      {/* Punto de la timeline (solo escritorio) */}
      <div
        className="
          hidden lg:flex
          absolute left-1/2 -translate-x-1/2 top-5
          items-center justify-center
        "
      >
        <div className="h-4 w-4 rounded-full bg-gradient-to-tr from-sky-400 to-purple-500 shadow-lg shadow-sky-700/60 flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-slate-950" />
        </div>
      </div>

      {/* Tarjeta */}
      <div
        className="rounded-3xl bg-black/35 border border-white/10
                   px-5 py-4 md:px-6 md:py-5
                   shadow-xl shadow-black/40 backdrop-blur-sm
                   transition-transform duration-200 ease-out
                   hover:-translate-y-1 hover:scale-[1.02]"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <h3 className="text-sm md:text-base font-semibold text-white">
            {item.cargo}
          </h3>
          <div className="text-[11px] md:text-xs text-white/60">
            {item.periodo}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-2 text-xs md:text-sm text-white/75">
          {item.empresaUrl ? (
            <a
              href={item.empresaUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300"
            >
              <span className="underline">{item.empresa}</span>
              <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="text-sky-400">{item.empresa}</span>
          )}
          <span className="text-white/40">•</span>
          <span>{item.ubicacion}</span>
        </div>

        <p className="text-xs md:text-sm text-white/80 leading-relaxed mb-3">
          {item.descripcion}
        </p>

        {item.logros.length > 0 && (
          <div>
            <div className="text-[11px] md:text-xs font-semibold text-white/70 mb-1.5">
              Logros destacados:
            </div>
            <ul className="space-y-1.5 text-[11px] md:text-xs text-white/80">
              {item.logros.map((logro) => (
                <li key={logro} className="flex gap-2">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-sky-400" />
                  <span>{logro}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const ExperienceTimeline: FC = () => {
  return (
    <section
      id="work"
      className="pt-10 md:pt-14 lg:pt-30 pb-12 md:pb-16 lg:pb-20"
    >
      <div className="max-w-5xl mx-auto px-4">
        {/* Título */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white mb-2">
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              Experiencia
            </span>
          </h2>
          <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto">
            Una vista rápida de dónde he estado trabajando y qué tipo de
            proyectos he construido en los últimos años.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-6">
          {/* Línea central en escritorio */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0">
            <div className="w-px h-full bg-gradient-to-b from-sky-500/0 via-sky-500/40 to-purple-500/0" />
          </div>

          <div className="space-y-10 md:space-y-12">
            {EXPERIENCES.map((item, index) => (
              <div
                key={item.id}
                className="relative flex flex-col lg:flex-row lg:items-stretch"
              >
                {/* En mobile: todas las tarjetas ocupan el ancho completo.
                    En desktop: se alternan izquierda / derecha. */}
                <ExperienceCard
                  item={item}
                  invertida={index % 2 === 1}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
