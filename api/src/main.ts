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
  const { AppExceptionFilter } = await import('./common/filters/app-exception.filter');
  app.useGlobalFilters(new AppExceptionFilter());

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  // versionamento por URI
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Swagger config único
  const config = new DocumentBuilder()
    .setTitle('Desafio Controle de Cadastros API')
    .setDescription('Documentação da API com múltiplas versões')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);

  await app.listen(3000);
}
bootstrap();
