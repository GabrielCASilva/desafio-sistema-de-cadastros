import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({ example: 'super.admin' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ example: 'senha123' })
  @IsString()
  @IsNotEmpty()
  senha: string;
}
