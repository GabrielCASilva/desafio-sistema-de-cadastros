import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './controllers/app.controller';
import { H2Module } from './h2/h2.module';
import { UserController } from './controllers/user.controller';
import { PersonController } from './controllers/person.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { PersonService } from './services/person.service';
import { USER_REPOSITORY } from './repositories/user-repository.interface';
import { PersonRepository } from './repositories/person.repository';
import { PERSON_REPOSITORY } from './repositories/person-repository.interface';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { JwtStrategy } from './common/strategies/jwt.strategy';

@Module({
  imports: [
    H2Module,
    JwtModule.register({
      secret: 'sua_chave_secreta_aqui',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AppController, UserController, PersonController, AuthController],
  providers: [
    UserService,
    PersonService,
    AuthService,
    UserRepository,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    PersonRepository,
    {
      provide: PERSON_REPOSITORY,
      useClass: PersonRepository,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    JwtStrategy,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
  static setupSwagger(app) {
    const config = new DocumentBuilder()
      .setTitle('API')
      .setDescription('Documentação da API')
      .setVersion('1.0')
      .addTag('Auth')
      .addTag('Users')
      .addTag('Persons')
      .addBearerAuth(
        {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
        'bearer',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }
}
