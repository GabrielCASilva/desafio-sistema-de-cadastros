import { IsString, IsNotEmpty, IsDateString, Length, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PersonCreateV2Dto {
  @ApiProperty({ example: 'Ana Silva' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: 'FEMININO', required: false })
  @IsString()
  @IsOptional()
  sexo?: string;

  @ApiProperty({ example: 'ana@email.com', required: false })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '1990-01-15' })
  @IsDateString()
  @IsNotEmpty()
  data_nascimento: string;

  @ApiProperty({ example: 'São Paulo', required: false })
  @IsString()
  @IsOptional()
  naturalidade?: string;

  @ApiProperty({ example: 'Brasileira', required: false })
  @IsString()
  @IsOptional()
  nacionalidade?: string;

  @ApiProperty({ example: 'Rua das Flores, 123' })
  @IsString()
  @IsNotEmpty()
  endereco: string;

  @ApiProperty({ example: '123.456.789-00' })
  @IsString()
  @Length(11, 14)
  @IsNotEmpty()
  cpf: string;

  @ApiProperty({ example: '1133334444', required: false })
  @IsString()
  @IsOptional()
  telefone?: string;

  @ApiProperty({ example: '1199998888', required: false })
  @IsString()
  @IsOptional()
  celular?: string;
}
