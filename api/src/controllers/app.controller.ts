import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Rota de boas-vindas')
@Controller({path: '', version: VERSION_NEUTRAL})
export class AppController {
  @Get()
    getHello(): string {
      return 'Bem-vindo à API!';
    }
}
