import type { FC, FormEvent } from "react";

const LoginModal: FC = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // 🔹 Por ahora solo redirige al dashboard.
    // Más adelante aquí llamamos a tu backend (Nest, etc.)
    if (typeof window !== "undefined") {
      window.location.href = "/dashboard";
    }
  };

  const handleClose = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center px-4">
      {/* Fondo difuminado */}
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xl" />

      {/* Card */}
      <div className="relative z-50 w-full max-w-md rounded-3xl bg-slate-950/95 border border-white/10 shadow-2xl shadow-black/60">
        {/* Botón cerrar */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          aria-label="Cerrar"
        >
          ✕
        </button>

        <div className="px-8 pt-8 pb-7 md:px-9 md:pt-9 md:pb-8 flex flex-col items-center">
          {/* Icono / logo */}
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-500 shadow-lg shadow-sky-500/40">
            <span className="text-2xl" aria-hidden="true">
              🔐
            </span>
          </div>

          {/* Títulos */}
          <h1 className="text-lg md:text-xl font-semibold text-white mb-1">
            Iniciar sesión
          </h1>
          <p className="text-xs md:text-sm text-white/70 mb-6 text-center">
            Accede a tu panel personal para revisar mensajes, oportunidades y notas del blog.
          </p>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="text-left">
              <label
                htmlFor="email"
                className="block text-xs font-medium text-white/70 mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="nombre@ejemplo.com"
                className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-500 transition"
              />
            </div>

            <div className="text-left">
              <label
                htmlFor="password"
                className="block text-xs font-medium text-white/70 mb-1.5"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-500 transition"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full inline-flex items-center justify-center rounded-2xl
                         bg-gradient-to-tr from-sky-500 to-blue-600 px-3 py-2.5
                         text-sm font-semibold text-white shadow-lg shadow-sky-500/40
                         hover:translate-y-0.5 transition-transform duration-200"
            >
              Continuar
            </button>
          </form>

          {/* Pie pequeño */}
          <p className="mt-4 text-[11px] text-white/50 text-center">
            Este acceso es solo para uso personal. Más adelante podrás conectar este login a un backend real.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
