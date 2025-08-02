import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Ping v2')
@Controller('api/v2/ping')
export class PingV2Controller {
  @Get()
  ping() {
    return { version: '2', pong: true };
  }
}
