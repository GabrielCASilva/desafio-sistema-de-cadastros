import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Rota de boas-vindas')
@Controller()
export class AppController {
  @Get()
    getHello(): string {
      return 'Bem-vindo à API!';
    }
}
