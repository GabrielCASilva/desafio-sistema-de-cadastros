import { Controller, Get, Post, Body, Param, Put, Delete, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { PessoaService } from '../services/person.service';
import { PersonResponseDto } from 'src/dtos/person/response.dto';
import { PersonCreateDto } from 'src/dtos/person/create.dto';
import { PersonUpdateDto } from 'src/dtos/person/update.dto';

@ApiTags('Pessoas')
@Controller('pessoas')
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
    @Version('1')
  async create(@Body() data: PersonCreateDto): Promise<PersonResponseDto> {
    return this.pessoaService.create(data);
  }

    @Post()
    @Version('2')
  async createV2(@Body() data: PersonCreateDto): Promise<PersonResponseDto> {
    return this.pessoaService.create(data);
  }

  @Put(':id')
  @ApiBody({ type: PersonUpdateDto })
  async update(@Param('id') id: number, @Body() data: PersonUpdateDto): Promise<PersonResponseDto> {
    return this.pessoaService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.pessoaService.remove(id);
  }
}
