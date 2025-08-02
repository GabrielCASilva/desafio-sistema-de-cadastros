import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Configuração inicial do Java antes do Nest
  const java = require('java');
  java.options.push('-Djava.awt.headless=true');
  java.options.push('--add-opens=java.base/java.lang=ALL-UNNAMED');
  
  const app = await NestFactory.create(AppModule);

  // Swagger config
  const { SwaggerModule, DocumentBuilder } = await import('@nestjs/swagger');
  const config = new DocumentBuilder()
    .setTitle('Desafio Controle de Cadastros API')
    .setDescription('Documentação da API do desafio')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);

  await app.listen(3000);
}
bootstrap();