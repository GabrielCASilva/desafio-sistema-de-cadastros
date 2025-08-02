import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { PessoaService } from '../services/person.service';
import { PersonResponseDto } from 'src/dtos/person/response.dto';
import { CreatePessoaDto } from 'src/dtos/person/create.dto';
import { UpdatePessoaDto } from 'src/dtos/person/update.dto';

@ApiTags('Pessoas')
@Controller('api/v1/pessoas')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @Get()
  async findAll(): Promise<PersonResponseDto[]> {
    return this.pessoaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PersonResponseDto> {
    return this.pessoaService.findOne(id);
  }

  @Post()
  async create(@Body() data: CreatePessoaDto): Promise<PersonResponseDto> {
    return this.pessoaService.create(data);
  }

  @Put(':id')
  @ApiBody({ type: UpdatePessoaDto })
  async update(@Param('id') id: number, @Body() data: UpdatePessoaDto): Promise<PersonResponseDto> {
    return this.pessoaService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.pessoaService.remove(id);
  }
}
