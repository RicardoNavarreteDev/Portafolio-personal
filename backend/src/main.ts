import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import chalk from 'chalk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });

  // CORS para Astro (4321)
  app.enableCors({
    origin: ['http://localhost:4321'],
    credentials: true,
  });

  // Prefijo global para la API
  app.setGlobalPrefix('api');

  // Filtros / Interceptores / Pipes
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));

  // Swagger en /docs (fuera del prefijo)
  const config = new DocumentBuilder()
    .setTitle('Portafolio API')
    .setDescription('API del backend del portafolio personal de Ricardo.')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
    .addServer('http://localhost:3000', 'Local')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(chalk.yellow(`🚀 Servidor: http://localhost:${port}`));
  console.log(chalk.cyan(`📘 Swagger : http://localhost:${port}/docs`));
  console.log(chalk.green(`🔌 API     : http://localhost:${port}/api/...`));
}
bootstrap();
