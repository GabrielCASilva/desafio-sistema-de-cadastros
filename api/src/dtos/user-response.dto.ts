import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  pessoa_id: number;

  @ApiProperty({ example: 'usuario123' })
  login: string;

  @ApiProperty({ example: true })
  ativo?: boolean;

  @ApiProperty({ example: '2025-08-02T12:00:00Z', required: false })
  last_login_at?: string | null;

  @ApiProperty({ example: '2025-08-02T12:00:00Z', required: false })
  created_at?: string | null;

  @ApiProperty({ example: '2025-08-02T12:00:00Z', required: false })
  updated_at?: string | null;
}
