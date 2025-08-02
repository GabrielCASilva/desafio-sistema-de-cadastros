import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PessoaService } from '../services/pessoa.service';
import { CreatePessoaDto } from '../dtos/create-pessoa.dto';

@ApiTags('Pessoas')
@Controller('api/v1/pessoas')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @Get()
  async findAll() {
    return this.pessoaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.pessoaService.findOne(id);
  }

  @Post()
  async create(@Body() data: CreatePessoaDto) {
    return this.pessoaService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<CreatePessoaDto>) {
    return this.pessoaService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.pessoaService.remove(id);
  }
}
