
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';

@ApiTags('Usuários')
@Controller('api/v1/usuarios')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() data: any) {
    return this.userService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: any) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
