import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { AuthService } from '../services/auth.service';
import { AuthLoginDto } from '../dtos/auth/login.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Login do usuário',
    description: 'Autentica o usuário e retorna token JWT.',
  })
  @ApiBody({
    description: 'Credenciais do usuário para login, testar com os dados de exemplo.',
    type: AuthLoginDto,
    examples: {
      example1: {
        value: {
          login: 'admin',
          senha: 'admin123',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Token JWT retornado com sucesso.' })
  @ApiResponse({ status: 401, description: 'Login ou senha inválidos.' })
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }
}
