// src/components/home/Hero.tsx
import type { FC } from 'react';
import { useEffect, useState } from 'react';

const Hero: FC = () => {
  // Solo animamos esta parte (después de "Hola 👋")
  const fullText = ' soy Ricardo Navarrete';
  const [animatedText, setAnimatedText] = useState('');

  useEffect(() => {
    const TYPING_SPEED = 90;      // ms entre letras al escribir
    const DELETING_SPEED = 70;    // ms entre letras al borrar
    const PAUSE_AT_END = 1500;    // pausa cuando llega al final
    const PAUSE_AT_START = 800;   // pausa cuando vuelve al inicio

    let timeoutId: number;

    const loop = (index: number, forward: boolean) => {
      if (forward) {
        // Escribiendo hacia adelante
        if (index <= fullText.length) {
          setAnimatedText(fullText.slice(0, index));
          timeoutId = window.setTimeout(
            () => loop(index + 1, true),
            TYPING_SPEED
          );
        } else {
          // Llegó al final → pausa y comienza a borrar
          timeoutId = window.setTimeout(
            () => loop(fullText.length - 1, false),
            PAUSE_AT_END
          );
        }
      } else {
        // Borrando hacia atrás
        if (index >= 0) {
          setAnimatedText(fullText.slice(0, index));
          timeoutId = window.setTimeout(
            () => loop(index - 1, false),
            DELETING_SPEED
          );
        } else {
          // Llegó al inicio → pausa y vuelve a escribir
          timeoutId = window.setTimeout(
            () => loop(1, true),
            PAUSE_AT_START
          );
        }
      }
    };

    // Iniciar animación
    loop(1, true);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [fullText]);

  return (
    <section className="pt-8 md:pt-10 lg:pt-12 pb-12 md:pb-16 lg:pb-20">
      <div className="max-w-3xl mx-auto text-center">
        {/* Avatar */}
        <div
          className="mx-auto mb-4 h-60 w-60 rounded-full border border-white/25
             bg-transparent p-1 shadow-lg shadow-black/40"
        >
          <img
            src="img/fotoperfil1.png"
            alt="Ricardo Navarrete"
            className="h-full w-full rounded-full object-cover object-[center_35%]"
          />
        </div>

        {/* Badge de disponibilidad */}
        <div className="mb-4 flex items-center justify-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs md:text-sm text-white/80 border border-white/10">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Disponible para trabajar</span>
          </div>
        </div>

        {/* Título principal */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3 min-h-[2.8rem] md:min-h-[3.2rem]">
          {/* Parte fija: Hola + mano */}
          <span className="text-white">
            Hola{' '}
            <span className="inline-block align-middle" aria-hidden="true">
              👋
            </span>
          </span>
          {/* Parte animada con gradiente */}
          <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent ml-1">
            {animatedText}
          </span>
        </h1>

        {/* Subtítulo */}
        <p className="text-sm md:text-lg text-white/80 mb-6">
          Desarrollador Full-Stack.
        </p>

        {/* Stats */}
        <div className="mt-2 grid grid-cols-1 place-items-center gap-4 text-xs md:text-sm text-white/80">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <span
                className="text-yellow-400 text-sm md:text-base"
                aria-hidden="true"
              >
                ★
              </span>
              <span className="text-base md:text-lg font-semibold text-white">
                3+
              </span>
            </div>
            <div className="opacity-70">Años de experiencia</div>
          </div>
        </div>

        {/* Texto descriptivo */}
        <p className="mt-6 text-sm md:text-base text-white/80 leading-relaxed max-w-2xl mx-auto">
          Me gusta darle vida al lado oculto de las aplicaciones, creando backends
          seguros, claros y fáciles de mantener con Node.js, NestJS, PHP y MySQL.
          También trabajo el frontend con React y Astro, y siempre busco mejorar
          un poco más cada proyecto.
        </p>

        {/* Botones */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/contacto"
            className="inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm md:text-base font-semibold
                       bg-gradient-to-tr from-sky-500 to-blue-600 text-white
                       shadow-lg shadow-sky-500/40
                       hover:translate-y-0.5 transition-transform duration-200"
          >
            <span className="text-lg">✉️</span>
            <span>Hablemos de tu proyecto</span>
          </a>
        </div>

        {/* Tecnologías */}
        <div className="mt-10 flex flex-wrap justify-center gap-2 text-[11px] md:text-xs text-white/75">
          <span className="rounded-full bg-white/5 px-3 py-1 border border-white/10">
            React & Astro
          </span>
          <span className="rounded-full bg-white/5 px-3 py-1 border border-white/10">
            TypeScript & Node.js
          </span>
          <span className="rounded-full bg-white/5 px-3 py-1 border border-white/10">
            NestJS & APIs REST
          </span>
          <span className="rounded-full bg-white/5 px-3 py-1 border border-white/10">
            PHP / WordPress avanzado
          </span>
          <span className="rounded-full bg-white/5 px-3 py-1 border border-white/10">
            MySQL & optimización
          </span>
          <span className="rounded-full bg-white/5 px-3 py-1 border border-white/10">
            Seguridad & hardening
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
