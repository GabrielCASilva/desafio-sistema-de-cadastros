import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';

import { UserService } from '../services/user.service';
import { UserResponseDto } from 'src/dtos/user/response.dto';
import { UserCreateDto } from 'src/dtos/user/create.dto';
import { UserUpdateDto } from 'src/dtos/user/update.dto';

@ApiTags('Users')
@ApiBearerAuth('bearer')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todos os usuários',
    description: 'Retorna uma lista de todos os usuários cadastrados.',
  })
  @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso.' })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  async findAll(): Promise<UserResponseDto[]> {
    return this.userService.findAll(true);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar usuário por ID',
    description: 'Retorna os detalhes de um usuário específico pelo ID.',
  })
  @ApiResponse({ status: 200, description: 'Usuário encontrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  @ApiResponse({ status: 400, description: 'ID inválido.' })
  async findOne(@Param('id') id: number): Promise<UserResponseDto> {
    return this.userService.findOne(id, true);
  }

  @Post()
  @ApiOperation({
    summary: 'Criar um novo usuário',
    description: 'Cadastra um novo usuário no sistema.',
  })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  @ApiResponse({ status: 409, description: 'Usuário já existe.' })
  @ApiBody({ type: UserCreateDto })
  async create(@Body() data: UserCreateDto): Promise<UserResponseDto | null> {
    return this.userService.create(data);
  }

  @Put(':id')
  @ApiBody({ type: UserUpdateDto })
  @ApiOperation({
    summary: 'Atualizar usuário',
    description: 'Atualiza os dados de um usuário existente.',
  })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async update(@Param('id') id: number, @Body() data: UserUpdateDto): Promise<UserResponseDto> {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remover usuário',
    description: 'Remove um usuário do sistema pelo ID.',
  })
  @ApiResponse({ status: 200, description: 'Usuário removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  @ApiResponse({ status: 400, description: 'ID inválido.' })
  async remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
