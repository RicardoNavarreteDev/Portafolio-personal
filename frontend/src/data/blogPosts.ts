// src/data/blogPosts.ts

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string;        // texto ya formateado
  readTime: string;    // "8 min de lectura"
  excerpt: string;
  content: string;     // texto simple, separado por saltos de línea
  featured?: boolean;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "tendencias-desarrollo-web-2024",
    title: "Tendencias en desarrollo web que debes seguir en 2024",
    category: "Technology",
    date: "15 marzo 2024",
    readTime: "8 min de lectura",
    featured: true,
    excerpt:
      "Un repaso a las tendencias más importantes en desarrollo web: IA, edge computing, rendimiento y nuevas herramientas para frontend y backend.",
    content: `
El mundo del desarrollo web está avanzando a una velocidad impresionante. En 2024, varias tendencias están marcando cómo construimos y pensamos las aplicaciones modernas.

La integración de inteligencia artificial está dejando de ser un lujo para convertirse en un componente estándar. Desde asistentes hasta recomendaciones personalizadas, la IA ya forma parte de la experiencia de usuario.

Otra área clave es el rendimiento y el edge computing. Cada vez más, buscamos tiempos de carga menores y experiencias más fluidas, sobre todo en aplicaciones que atienden usuarios en distintas partes del mundo.

Como desarrolladores, mantenerse al día con estas tendencias es fundamental para crear productos competitivos y listos para el futuro.
    `.trim(),
  },
  {
    slug: "mejores-practicas-react-escalable",
    title: "Cómo construir aplicaciones React escalables",
    category: "React",
    date: "8 marzo 2024",
    readTime: "12 min de lectura",
    featured: true,
    excerpt:
      "Buenas prácticas para estructurar proyectos React, manejar estado, dividir responsabilidades y mantener el código limpio a medida que la app crece.",
    content: `
React es una herramienta potentísima, pero sin una buena estructura un proyecto puede volverse inmanejable rápidamente.

Una de las claves es separar claramente componentes de UI, lógica de negocio y servicios. También ayuda definir convenciones de carpetas y nombres desde el inicio.

Otro punto importante es elegir bien la estrategia de estado: context, librerías como Zustand o Redux Toolkit, o simplemente estado local según el tamaño de la app.

La idea central es que el código se pueda leer, testear y escalar sin sufrir cada vez que agregas una nueva funcionalidad.
    `.trim(),
  },
  {
    slug: "typescript-vs-javascript-cuando-usar",
    title: "TypeScript vs JavaScript: ¿cuándo usar cada uno?",
    category: "Development",
    date: "28 febrero 2024",
    readTime: "10 min de lectura",
    featured: false,
    excerpt:
      "Una comparación práctica entre JavaScript y TypeScript para decidir cuándo vale la pena tipar tu proyecto y qué beneficios obtienes en el día a día.",
    content: `
TypeScript se ha convertido casi en el estándar para aplicaciones medianas y grandes, pero eso no significa que JavaScript haya quedado atrás.

La gran ventaja de TypeScript está en el feedback temprano, el autocompletado y la documentación viva del propio código. Sin embargo, también agrega una pequeña capa de complejidad en la configuración inicial.

En proyectos pequeños, scripts rápidos o prototipos, JavaScript sigue siendo más que suficiente. La clave está en elegir la herramienta adecuada según el contexto.
    `.trim(),
  },
  {
    slug: "dominar-css-grid-flexbox",
    title: "Dominar CSS Grid y Flexbox para layouts modernos",
    category: "CSS",
    date: "20 febrero 2024",
    readTime: "15 min de lectura",
    featured: false,
    excerpt:
      "Cómo combinar Flexbox y CSS Grid para crear layouts modernos, responsivos y mantenibles sin depender de hacks ni frameworks pesados.",
    content: `
CSS Grid y Flexbox cambiaron por completo la forma en que construimos layouts.

Flexbox brilla cuando se trata de alinear elementos en una dimensión: filas o columnas. CSS Grid, en cambio, está pensado para estructuras bidimensionales más complejas.

La combinación de ambos permite crear layouts potentes, responsivos y mucho más legibles que las soluciones basadas en floats o posiciones absolutas.
    `.trim(),
  },
];

export const featuredPosts = blogPosts.filter((post) => post.featured);
export const recentPosts = blogPosts.filter((post) => !post.featured);

export const getPostBySlug = (slug: string) =>
  blogPosts.find((post) => post.slug === slug);
