import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { H2Module } from './h2/h2.module';
import { UserController } from './controllers/user.controller';
import { PessoaController } from './controllers/pessoa.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { PessoaService } from './services/person.service';
import { USER_REPOSITORY } from './repositories/user-repository.interface';
import { PersonRepository } from './repositories/person.repository';
import { PERSON_REPOSITORY } from './repositories/person-repository.interface';

@Module({
  imports: [H2Module],
  controllers: [AppController, UserController, PessoaController],
  providers: [
    UserService,
    PessoaService,
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
  ],
})
export class AppModule {}
