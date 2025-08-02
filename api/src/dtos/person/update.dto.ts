import { PartialType } from '@nestjs/swagger';
import { CreatePessoaDto } from './create.dto';

export class UpdatePessoaDto extends PartialType(CreatePessoaDto) {}
