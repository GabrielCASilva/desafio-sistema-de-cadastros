import { ApiProperty, PartialType } from '@nestjs/swagger';
import { UserCreateDto } from './create.dto';

export class UserUpdateDto extends PartialType(UserCreateDto) {
  @ApiProperty({
    required: false,
    description: 'ID da pessoa associada ao usuário',
    writeOnly: true,
  })
  pessoa_id?: never;
}
