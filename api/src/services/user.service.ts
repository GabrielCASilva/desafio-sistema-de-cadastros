import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
// import { H2Service } from '../h2/h2.service';
import { UserMapper } from '../mappers/user.mapper';
import { IUserRepository, USER_REPOSITORY } from '../repositories/user-repository.interface';
import { UserResponseDto } from 'src/dtos/user/response.dto';
import { UserCreateDto } from 'src/dtos/user/create.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();
    return users.map(UserMapper.fromDb).map(UserMapper.toResponseDto);
  }

  async findOne(id: number): Promise<UserResponseDto> {
    const dbUser = await this.userRepository.findById(id);
    if (!dbUser) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return UserMapper.toResponseDto(UserMapper.fromDb(dbUser));
  }

  async create(data: UserCreateDto): Promise<UserResponseDto | null> {
    await this.userRepository.insert(data);
    const last = await this.userRepository.findLastInserted();
    return last ? UserMapper.toResponseDto(UserMapper.fromDb(last)) : null;
  }

  async update(id: number, data: Partial<UserCreateDto>): Promise<UserResponseDto> {
    await this.userRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.userRepository.remove(id);
    return { deleted: true };
  }
}
