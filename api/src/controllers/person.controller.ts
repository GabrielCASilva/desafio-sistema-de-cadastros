import { Controller, Get, Post, Body, Param, Put, Delete, Version } from '@nestjs/common';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { PersonService } from '../services/person.service';
import { PersonResponseDto } from 'src/dtos/person/response.dto';
import { PersonCreateDto } from 'src/dtos/person/create.dto';
import { PersonCreateV2Dto } from 'src/dtos/person/create-v2.dto';
import { PersonUpdateDto } from 'src/dtos/person/update.dto';

@ApiTags('Persons')
@ApiBearerAuth('bearer')
@Controller('persons')
export class PersonController {
  constructor(private readonly pessoaService: PersonService) {}

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
    return this.pessoaService.createV1(data);
  }

  @Post()
  @Version('2')
  async createV2(@Body() data: PersonCreateV2Dto): Promise<PersonResponseDto> {
    return this.pessoaService.createV2(data);
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
