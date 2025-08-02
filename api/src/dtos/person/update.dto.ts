import { PartialType } from '@nestjs/swagger';
import { PersonCreateDto } from './create.dto';

export class PersonUpdateDto extends PartialType(PersonCreateDto) {}
