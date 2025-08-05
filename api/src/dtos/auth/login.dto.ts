import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({ example: 'admin' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ example: 'admin123' })
  @IsString()
  @IsNotEmpty()
  senha: string;
}
