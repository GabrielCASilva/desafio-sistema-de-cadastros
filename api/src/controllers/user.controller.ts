
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserResponseDto } from '../dtos/user-response.dto';
import { UserService } from '../services/user.service';

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
  async update(@Param('id') id: number, @Body() data: Partial<CreateUserDto>): Promise<UserResponseDto> {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
