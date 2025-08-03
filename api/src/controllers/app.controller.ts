import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';

@ApiExcludeController()
@Controller({ path: '', version: VERSION_NEUTRAL })
export class AppController {
  @Public()
  @Get()
  getHello(): string {
    return 'Bem-vindo à API!';
  }
}
