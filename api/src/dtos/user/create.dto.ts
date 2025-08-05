import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsBoolean, IsOptional } from 'class-validator';

export class UserCreateDto {
  @ApiProperty({ example: 1, description: 'ID da pessoa associada ao usuário' })
  @IsInt()
  pessoa_id: number;

  @ApiProperty({ example: 'usuario123', description: 'Login do usuário' })
  @IsString()
  login: string;

  @ApiProperty({ example: 'senhaSegura123', description: 'Senha do usuário' })
  @IsString()
  senha: string;

  @ApiProperty({ example: true, description: 'Se o usuário está ativo' })
  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
