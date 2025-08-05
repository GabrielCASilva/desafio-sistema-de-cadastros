import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  // Configuração inicial do Java antes do Nest
  const java = require('java');
  java.options.push('-Djava.awt.headless=true');
  java.options.push('--add-opens=java.base/java.lang=ALL-UNNAMED');

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  const { AppExceptionFilter } = await import('./common/filters/app-exception.filter');
  app.useGlobalFilters(new AppExceptionFilter());

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  // versionamento por URI
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Swagger com JWT Bearer
  AppModule.setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
