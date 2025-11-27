import type { FC } from 'react';

const AboutMe: FC = () => {
  return (
    <section
      id="about"
      className="pt-22 md:pt-22 lg:pt-35 pb-12 md:pb-16 lg:pb-20"
    >
      <div className="max-w-5xl mx-auto px-4">
        {/* Título sección */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-4xl font-extrabold tracking-tight text-white mb-2">
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              Sobre mí
            </span>
          </h2>
          <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto">
            Un poco de la historia detrás del código.
          </p>
        </div>

        {/* Layout principal: texto + tarjeta */}
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-stretch">
          {/* Texto */}
          <div className="space-y-4 text-sm md:text-base text-white/80 leading-relaxed lg:mt-6">
            <p>
              Desde chico siempre me han llamado la atención la tecnología y, en especial, los computadores. El 2020 entré a estudiar Ingeniería en Informática y ahí confirmé que este mundo era realmente lo mío, con un interés particular por el desarrollo web y móvil.
            </p>
            <p>
              Con el tiempo me he ido enfocando más en el backend, sin dejar de lado el frontend, desarrollando proyectos completos y aprendiendo nuevas tecnologías que me permitan crear soluciones mejores y más escalables. 
              Me encanta seguir aprendiendo, enfrentar nuevos desafíos y ver cómo una idea pasa de un concepto a algo real que la gente puede usar.
            </p>
            <p>
            Me considero una persona comprometida, trabajadora y con buena relación con los demás, tanto en equipo como de forma individual. Además de programar, 
            mis hobbies son el deporte y la lectura, que me ayudan a equilibrar la cabeza y seguir creciendo tanto a nivel profesional como personal.            
            </p>

            {/* Chips inferiores */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="rounded-full bg-purple-500/20 border border-purple-400/40 px-3 py-1 text-xs md:text-[13px] text-purple-100">
                3+ años de experiencia
              </span>
              <span className="rounded-full bg-sky-500/15 border border-sky-400/40 px-3 py-1 text-xs md:text-[13px] text-sky-100">
                Backend & APIs
              </span>
              <span className="rounded-full bg-emerald-500/15 border border-emerald-400/40 px-3 py-1 text-xs md:text-[13px] text-emerald-100">
                Seguridad y mejora continua
              </span>
            </div>
          </div>

           {/* Tarjeta con foto a todo el recuadro (solo >= 1024px) */}
        <div className="relative hidden lg:block">
        <div className="h-full rounded-3xl bg-gradient-to-r from-sky-500/60 to-purple-500/60 p-[1px] shadow-xl shadow-black/30">
            <div className="relative h-full min-h-[240px] rounded-3xl overflow-hidden">
            <img
                src="img/yo.jpeg"
                alt="Ricardo Navarrete trabajando"
                className="w-full h-full object-cover"
            />

            {/* Badge "Actualmente codificando" dentro del recuadro */}
            <div className="absolute bottom-3 right-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/15 px-3 py-1 text-[11px] md:text-xs text-white/80 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Actualmente codificando…</span>
                </div>
            </div>
            </div>
        </div>
        </div>


         </div>
      </div>
    </section>
  );
};

export default AboutMe;
