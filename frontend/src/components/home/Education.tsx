// src/components/EducationSection.tsx

import React from "react";

type EducationItem = {
  title: string;
  titleSecondLine?: string;
  institution: string;
  period: string;
  description: string;
  achievements: string[];
  link?: string;
  imageSrc: string;
  imageAlt: string;
};

const items: EducationItem[] = [
  {
    title: "Ingeniería en Informática",
    institution: "INACAP",
    period: "2020 – 2024",
    description:
      "Formación en desarrollo de software, bases de datos, arquitecturas web y buenas prácticas de ingeniería.",
    achievements: [
      "Proyectos orientados a necesidades reales",
      "Enfoque en desarrollo web y backend",
      "Trabajo en equipo con metodologías ágiles",
    ],
    link: "#",
    imageSrc: "img/logo-inacap.png",
    imageAlt: "Logo INACAP",
  },
  {
    title: "Certificado DevOps",
    institution: "Talento Digital",
    period: "2025",
    description:
      "Automatización, integración continua, despliegue continuo y monitoreo de aplicaciones.",
    achievements: [
      "Diseño de pipelines CI/CD",
      "Automatización de despliegues",
      "Buenas prácticas de colaboración Dev + Ops",
    ],
    link: "#",
    imageSrc: "img/logo-td.png",
    imageAlt: "Logo Talento Digital",
  },
  {
    title: "React",
    titleSecondLine: "TypeScript",
    institution: "Udemy",
    period: "2025",
    description:
      "Desarrollo frontend moderno con React, hooks, componentes reutilizables y tipado estático con TypeScript.",
    achievements: [
      "SPAs construidas con React",
      "Uso de hooks y Context API",
      "Código más seguro usando TypeScript",
    ],
    link: "#",
    imageSrc: "img/logo-udemy.png",
    imageAlt: "Logo Udemy",
  },
];

const EducationSection: React.FC = () => {
  return (
    <section id="educacion" className="py-20 px-4 md:px-6 lg:px-10">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2
          className="text-2xl md:text-4xl font-extrabold tracking-tight text-white mb-2"
        >
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                Educación &amp; Certificaciones
            </span>
          
        </h2>
        <p className="text-sm md:text-base text-slate-300/80 max-w-2xl mx-auto">
          Mi formación académica y continua, siempre enfocada en construir
          soluciones reales y de alto impacto.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {items.map((item) => (
          <article
            key={item.title + item.institution}
            className="relative flex flex-col h-full
                       rounded-3xl border border-cyan-400/15
                       bg-slate-900/70 backdrop-blur
                       shadow-[0_18px_60px_rgba(0,0,0,0.55)]
                       p-6 md:p-7"
          >
            {/* Imagen + título */}
            <div className="flex items-start gap-4 mb-4">
              {/* Recuadro del logo MÁS GRANDE */}
              <div
                className="h-20 w-20 md:h-32 md:w-32 rounded-2xl
                           border border-sky-500/60
                           bg-transparent
                           p-2 shadow-lg shadow-sky-500/40
                           overflow-hidden flex items-center justify-center"
              >
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-semibold text-slate-50 leading-snug">
                  <span>{item.title}</span>
                  {item.titleSecondLine && (
                    <span className="block">{item.titleSecondLine}</span>
                  )}
                </h3>
                <p className="text-sm md:text-base text-cyan-300 mt-1">
                  {item.institution}
                </p>
                <span
                  className="inline-flex mt-3 px-3 py-1 text-xs font-semibold
                             rounded-full bg-slate-800/80 text-slate-100 border border-slate-600/60"
                >
                  {item.period}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300/90 mb-4 leading-relaxed">
              {item.description}
            </p>

            <div className="mt-auto">
              <p className="text-xs font-semibold text-slate-200 tracking-wide mb-2">
                Logros destacados:
              </p>
              <ul className="space-y-1.5 text-sm text-slate-300/90 mb-5">
                {item.achievements.map((ach) => (
                  <li key={ach} className="flex gap-2">
                    <span className="mt-[6px] inline-block w-1.5 h-1.5 rounded-full bg-cyan-300" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>

              <a
                href={item.link}
                className="inline-flex items-center justify-center w-full gap-2
                           rounded-2xl px-5 py-2.5 text-sm md:text-base font-semibold
                           bg-gradient-to-tr from-sky-500 to-blue-600 text-white
                           shadow-lg shadow-sky-500/40
                           hover:translate-y-0.5 transition-transform duration-200"
              >
                <span className="text-lg">📜</span>
                <span>Ver diploma</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;
