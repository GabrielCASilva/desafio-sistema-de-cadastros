import {
  IsString,
  IsOptional,
  IsDateString,
  Length,
  IsNotEmpty,
  IsEmail,
  Matches,
  Validate,
  IsIn,
} from 'class-validator';

import { IsPastDateConstraint } from 'src/common/validators/is-past-date.validator';
import { ApiProperty } from '@nestjs/swagger';
import { SEXO_ENUM } from 'src/entities/person.entity';

export class PersonCreateDto {
  @ApiProperty({ example: 'Ana Silva' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: 'FEMININO', required: false, enum: SEXO_ENUM })
  @IsString()
  @IsOptional()
  @IsIn(SEXO_ENUM, {
    message: 'O sexo deve ser MASCULINO, FEMININO ou OUTRO',
  })
  sexo?: string;

  @ApiProperty({ example: 'ana@email.com', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '1990-01-15' })
  @IsDateString()
  @IsNotEmpty()
  @Validate(IsPastDateConstraint)
  data_nascimento: string;

  @ApiProperty({ example: 'São Paulo', required: false })
  @IsString()
  @IsOptional()
  naturalidade?: string;

  @ApiProperty({ example: 'Brasileira', required: false })
  @IsString()
  @IsOptional()
  nacionalidade?: string;

  @ApiProperty({ example: 'Rua das Flores, 123', required: false })
  @IsString()
  @IsOptional()
  endereco?: string;

  @ApiProperty({ example: '123.456.789-00' })
  @IsString()
  @Length(11, 14)
  @IsNotEmpty()
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: 'O CPF deve estar no formato 000.000.000-00' })
  cpf: string;

  @ApiProperty({ example: '1199998888', required: false })
  @IsString()
  @IsOptional()
  celular?: string;
}
