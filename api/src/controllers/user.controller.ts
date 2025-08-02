
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';

import { UserService } from '../services/user.service';
import { UserResponseDto } from 'src/dtos/user/response.dto';
import { CreateUserDto } from 'src/dtos/user/create.dto';
import { UpdateUserDto } from 'src/dtos/user/update.dto';

@ApiTags('Usuários')
@Controller('api/v1/usuarios')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserResponseDto> {
    return this.userService.findOne(id);
  }

  @Post()
  @ApiBody({ type: CreateUserDto })
  async create(@Body() data: CreateUserDto): Promise<UserResponseDto | null> {
    return this.userService.create(data);
  }

  @Put(':id')
  @ApiBody({ type: UpdateUserDto })
  async update(@Param('id') id: number, @Body() data: UpdateUserDto): Promise<UserResponseDto> {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
