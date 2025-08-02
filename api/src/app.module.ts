import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { H2Module } from './h2/h2.module';
import { UserController } from './controllers/user.controller';
import { PessoaController } from './controllers/pessoa.controller';
import { PingV2Controller } from './controllers/ping-v2.controller';
import { UserService } from './services/user.service';
import { PessoaService } from './services/pessoa.service';

@Module({
  imports: [H2Module],
  controllers: [AppController, UserController, PessoaController, PingV2Controller],
  providers: [UserService, PessoaService],
})
export class AppModule {}
