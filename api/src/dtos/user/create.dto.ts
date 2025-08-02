import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 1, description: 'ID da pessoa associada ao usuário' })
  pessoa_id: number;

  @ApiProperty({ example: 'usuario123', description: 'Login do usuário' })
  login: string;

  @ApiProperty({ example: 'senhaSegura123', description: 'Senha do usuário' })
  senha: string;

  @ApiProperty({ example: true, description: 'Se o usuário está ativo' })
  ativo?: boolean;
}
