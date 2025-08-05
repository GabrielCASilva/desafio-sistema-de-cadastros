import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Version,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { PersonService } from '../services/person.service';
import { PersonResponseDto } from 'src/dtos/person/response.dto';
import { PersonCreateDto } from 'src/dtos/person/create.dto';
import { PersonCreateV2Dto } from 'src/dtos/person/create-v2.dto';
import { PersonUpdateDto } from 'src/dtos/person/update.dto';
import {
  PersonCreateExamplesV1,
  PersonCreateExamplesV2,
  PersonResponseExemple,
} from 'src/swagger/person.exemples';

@ApiTags('Persons')
@ApiBearerAuth('bearer')
@Controller('persons')
export class PersonController {
  constructor(private readonly pessoaService: PersonService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Listar todas as pessoas',
    description: 'Retorna uma lista de todas as pessoas cadastradas.',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Lista de pessoas retornada com sucesso.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Não autorizado.' })
  async findAll(): Promise<PersonResponseDto[]> {
    return this.pessoaService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar pessoa por ID',
    description: 'Retorna os detalhes de uma pessoa específica pelo ID.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Pessoa encontrada com sucesso.',
    schema: {
      example: PersonResponseExemple,
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Falha ao buscar uma pessoa no banco..',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Não autorizado.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'ID inválido.' })
  async findOne(@Param('id') id: number): Promise<PersonResponseDto> {
    return this.pessoaService.findOne(id);
  }

  @Post()
  @Version('1')
  @ApiBody({
    type: PersonCreateDto,
    examples: PersonCreateExamplesV1,
  })
  @ApiOperation({
    summary: 'Criar uma nova pessoa',
    description: 'Cadastra uma nova pessoa no sistema.',
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Pessoa criada com sucesso.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Dados inválidos.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Não autorizado.' })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Falha ao cadastrar nova pessoa no banco.',
  })
  async create(@Body() data: PersonCreateDto): Promise<PersonResponseDto> {
    return this.pessoaService.createV1(data);
  }

  @Post()
  @Version('2')
  @ApiBody({ type: PersonCreateV2Dto, examples: PersonCreateExamplesV2 })
  @ApiOperation({
    summary: 'Criar pessoa (V2)',
    description:
      'Cadastra uma nova pessoa no sistema. Esta versão inclui o campo endereço como obrigatório.',
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Pessoa criada com sucesso.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Dados inválidos.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Não autorizado.' })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Falha ao cadastrar nova pessoa no banco.',
  })
  async createV2(@Body() data: PersonCreateV2Dto): Promise<PersonResponseDto> {
    return this.pessoaService.createV2(data);
  }

  @Put(':id')
  @ApiBody({ type: PersonUpdateDto })
  @ApiOperation({
    summary: 'Atualizar pessoa',
    description: 'Atualiza os dados de uma pessoa existente.',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Pessoa atualizada com sucesso.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Pessoa não encontrada.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Não autorizado.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Erro inesperado.' })
  async update(@Param('id') id: number, @Body() data: PersonUpdateDto): Promise<PersonResponseDto> {
    return this.pessoaService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remover pessoa',
    description: 'Remove uma pessoa do sistema pelo ID.',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Pessoa removida com sucesso.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Pessoa não encontrada.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Não autorizado.' })
  async remove(@Param('id') id: number) {
    return this.pessoaService.remove(id);
  }
}
