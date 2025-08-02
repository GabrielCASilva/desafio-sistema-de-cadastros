import { PartialType } from '@nestjs/swagger';
import { UserCreateDto } from './create.dto';

export class UserUpdateDto extends PartialType(UserCreateDto) {}
