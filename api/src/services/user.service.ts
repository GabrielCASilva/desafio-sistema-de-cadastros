import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
// import { H2Service } from '../h2/h2.service';
import { UserMapper } from '../mappers/user.mapper';
import { User } from '../entities/user.entity';
import { IUserRepository, USER_REPOSITORY } from '../repositories/user-repository.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users.map(UserMapper.fromDb);
  }

  async findOne(id: number): Promise<User> {
    const dbUser = await this.userRepository.findById(id);
    if (!dbUser) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return UserMapper.fromDb(dbUser);
  }

  async create(data: any) {
    await this.userRepository.insert(data);
    const last = await this.userRepository.findLastInserted();
    return last ? UserMapper.fromDb(last) : null;
  }

  async update(id: number, data: any) {
    await this.userRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.userRepository.remove(id);
    return { deleted: true };
  }
}
