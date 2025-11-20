import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { slugify } from '../src/common/utils/slugify';

const prisma = new PrismaClient();

async function main() {
  console.log('🧩 Iniciando seed de la base de datos...');
  
  let adminUser;

  // 🔹 Usuario admin
  const adminEmail = 'ricardo.navarrete.soto@gmail.com';
  const existingUser = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (!existingUser) {
    const hash = await bcrypt.hash('123456', 10);
    adminUser = await prisma.user.create({
      data: {
        name: 'Ricardo Navarrete',
        email: adminEmail,
        password: hash,
        role: 'admin',
      },
    });
    console.log('✅ Usuario admin creado');
  } else {
    adminUser = existingUser;
    console.log('⚠️ Usuario admin ya existe');
  }

  // 🔹 Blog posts de ejemplo
  const blogCount = await prisma.blog.count();
  if (blogCount === 0) {
    const blogPosts = [
      {
        title: 'Introducción a NestJS: El framework Node.js que amarás',
        description: 'Descubre por qué NestJS se está convirtiendo en el framework preferido para desarrollar aplicaciones backend con Node.js',
        content: `# Introducción a NestJS

NestJS es un framework progresivo de Node.js para crear aplicaciones del lado del servidor eficientes y escalables. 

## ¿Por qué NestJS?

- Arquitectura similar a Angular
- Soporte TypeScript nativo
- Decoradores potentes
- Inyección de dependencias
- Modular y escalable

## Primeros pasos

\`\`\`typescript
import { Controller, Get } from '@nestjs/common';

@Controller('hello')
export class HelloController {
  @Get()
  sayHello() {
    return 'Hello World!';
  }
}
\`\`\`

## Conclusión

NestJS ofrece una experiencia de desarrollo excepcional...`,
        tags: ['nestjs', 'nodejs', 'typescript', 'backend'],
        isPublished: true,
        authorId: adminUser.id
      },
      {
        title: 'Mejores prácticas en API REST con NestJS',
        description: 'Aprende a construir APIs REST siguiendo las mejores prácticas y patrones de diseño',
        content: `# Mejores prácticas en API REST

En este artículo exploraremos las mejores prácticas para construir APIs REST...

## Principios REST

1. Stateless
2. Recursos bien definidos
3. Verbos HTTP apropiados

## Ejemplos prácticos

\`\`\`typescript
@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    // implementación
  }
}
\`\`\`

## Conclusiones

Seguir estas prácticas mejorará la calidad de tu API...`,
        tags: ['api', 'rest', 'nestjs', 'backend'],
        isPublished: true,
        authorId: adminUser.id
      },
      {
        title: 'Implementando autenticación JWT en NestJS',
        description: 'Guía paso a paso para implementar autenticación JWT en tu aplicación NestJS',
        content: `# Autenticación JWT en NestJS

JWT (JSON Web Tokens) es un estándar para la creación de tokens...

## Configuración

1. Instalar dependencias
2. Configurar estrategia JWT
3. Implementar guards

## Código de ejemplo

\`\`\`typescript
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // implementación
}
\`\`\`

## Próximos pasos

Consideraciones de seguridad y mejores prácticas...`,
        tags: ['security', 'jwt', 'authentication', 'nestjs'],
        isPublished: false,
        authorId: adminUser.id
      }
    ];

    for (const post of blogPosts) {
      await prisma.blog.create({
        data: {
          ...post,
          slug: slugify(post.title)
        }
      });
    }
    console.log('✅ Posts de blog de ejemplo creados');
  } else {
    console.log('⚠️ Ya existen posts en la base de datos');
  }

  // 🔹 Mensajes dummy
  const messagesCount = await prisma.message.count();
  if (messagesCount === 0) {
    await prisma.message.createMany({
      data: [
        {
          name: 'Juan Pérez',
          email: 'juan@example.com',
          content: 'Hola Ricardo, excelente portafolio!',
          responded: false,
        },
        {
          name: 'María López',
          email: 'maria@example.com',
          content: '¿Podrías desarrollar una web para mi negocio?',
          responded: true,
        },
        {
          name: 'Carlos Silva',
          email: 'carlos@example.com',
          content: 'Me interesa colaborar en un proyecto open source contigo.',
          responded: false,
        },
      ],
    });
    console.log('✅ Mensajes de prueba creados');
  } else {
    console.log('⚠️ Ya existen mensajes en la base de datos');
  }

  console.log('🎉 Seed completado');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
