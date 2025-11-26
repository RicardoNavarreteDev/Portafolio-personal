// src/components/home/ContactSection.tsx
import type { FC, FormEvent } from "react";

const ContactSection: FC = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Aquí después conectamos con la API / backend
    console.log("Formulario enviado (TODO: conectar backend)");
  };

  return (
    <section
      id="contacto"
      className="py-30 px-4 md:px-6 lg:px-10"
    >
      <div className="max-w-3xl mx-auto">
        {/* Título + texto (mismo estilo que Proyectos destacados) */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-3">
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              Ponte en contacto
            </span>
          </h2>
          <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto">
            ¿Listo para iniciar tu próximo proyecto? Hablemos sobre cómo puedo
            ayudarte a llevar tus ideas a producción.
          </p>
        </div>

        {/* Card del formulario (más pequeña) */}
        <div
          className="max-w-xl mx-auto rounded-3xl border border-cyan-400/20 bg-slate-900/70
                     backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.6)]
                     px-5 py-6 md:px-6 md:py-7"
        >
          <h3
            className="text-center text-lg md:text-xl font-semibold mb-6
                       bg-gradient-to-r from-sky-400 to-purple-400
                       bg-clip-text text-transparent"
          >
            
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                Envíame un mensaje
            </span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre + Apellido */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-200 mb-1.5">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Tu nombre"
                  className="w-full rounded-2xl border border-sky-500/30 bg-black/20
                             px-3 py-2.5 text-sm text-slate-100
                             placeholder:text-slate-400/80
                             focus:outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-400
                             transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-200 mb-1.5">
                  Apellido
                </label>
                <input
                  type="text"
                  name="apellido"
                  placeholder="Tu apellido"
                  className="w-full rounded-2xl border border-sky-500/30 bg-black/20
                             px-3 py-2.5 text-sm text-slate-100
                             placeholder:text-slate-400/80
                             focus:outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-400
                             transition-all"
                  required
                />
              </div>
            </div>

            {/* Correo + Celular */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-200 mb-1.5">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="tu.email@ejemplo.com"
                  className="w-full rounded-2xl border border-sky-500/30 bg-black/20
                             px-3 py-2.5 text-sm text-slate-100
                             placeholder:text-slate-400/80
                             focus:outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-400
                             transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-200 mb-1.5">
                  Celular <span className="text-slate-400">(opcional)</span>
                </label>
                <input
                  type="tel"
                  name="celular"
                  placeholder="+56 9 1234 5678"
                  className="w-full rounded-2xl border border-sky-500/30 bg-black/20
                             px-3 py-2.5 text-sm text-slate-100
                             placeholder:text-slate-400/80
                             focus:outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-400
                             transition-all"
                />
              </div>
            </div>

            {/* Asunto */}
            <div>
              <label className="block text-xs font-medium text-slate-200 mb-1.5">
                Asunto
              </label>
              <input
                type="text"
                name="subject"
                placeholder="Sobre qué te gustaría hablar..."
                className="w-full rounded-2xl border border-sky-500/30 bg-black/20
                           px-3 py-2.5 text-sm text-slate-100
                           placeholder:text-slate-400/80
                           focus:outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-400
                           transition-all"
                required
              />
            </div>

            {/* Mensaje */}
            <div>
              <label className="block text-xs font-medium text-slate-200 mb-1.5">
                Mensaje
              </label>
              <textarea
                name="mensaje"
                rows={5}
                placeholder="Cuéntame sobre tu proyecto, plazos, objetivos, tecnología que te interesa, etc."
                className="w-full rounded-2xl border border-sky-500/30 bg-black/20
                           px-3 py-2.5 text-sm text-slate-100
                           placeholder:text-slate-400/80
                           focus:outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-400
                           transition-all resize-none"
                required
              />
            </div>

            {/* Botón enviar */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl
                           px-5 py-2.5 text-sm md:text-base font-semibold
                           bg-gradient-to-tr from-sky-500 to-blue-600 text-white
                           shadow-lg shadow-sky-500/40
                           hover:translate-y-0.5 transition-transform duration-200"
              >
                <span className="text-lg" aria-hidden="true">
                  📨
                </span>
                <span>Enviar mensaje</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
