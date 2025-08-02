import { ApiProperty } from '@nestjs/swagger';

export class PersonResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'João Silva' })
  nome: string;

  @ApiProperty({ example: 'M', required: false })
  sexo?: string;

  @ApiProperty({ example: 'joao@email.com', required: false })
  email?: string;

  @ApiProperty({ example: '1990-01-01' })
  data_nascimento: string;

  @ApiProperty({ example: 'São Paulo', required: false })
  naturalidade?: string;

  @ApiProperty({ example: 'Brasileiro', required: false })
  nacionalidade?: string;

  @ApiProperty({ example: 'Rua das Flores, 123', required: false })
  endereco?: string;

  @ApiProperty({ example: '123.456.789-00' })
  cpf: string;

  @ApiProperty({ example: '(11) 91234-5678', required: false })
  celular?: string;

  @ApiProperty({ example: '2025-08-02T12:00:00Z', required: false })
  created_at?: string | null;

  @ApiProperty({ example: '2025-08-02T12:00:00Z', required: false })
  updated_at?: string | null;
}
