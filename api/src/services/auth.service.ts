import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../services/user.service';
import { AuthLoginDto } from '../dtos/auth/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(login: string, senha: string) {
    const user = await this.userService.findByLogin(login);
    if (user && user.senha === senha) {
      // Remover senha do retorno
      const { senha, ...result } = user;
      return result;
    }
    return null;
  }

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.userService.findByLogin(authLoginDto.login);
    if (!user || user.senha !== authLoginDto.senha) {
      throw new UnauthorizedException('Login ou senha inválidos');
    }
    const payload = { sub: user.id, login: user.login };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
