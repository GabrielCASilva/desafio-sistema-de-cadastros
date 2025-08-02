import { Injectable, Inject } from '@nestjs/common';
import { UserMapper } from '../mappers/user.mapper';
import { IUserRepository, USER_REPOSITORY } from '../repositories/user-repository.interface';
import { UserResponseDto } from 'src/dtos/user/response.dto';
import { UserCreateDto } from 'src/dtos/user/create.dto';
import {
  UserFieldDuplicateException,
  UserNotFoundException,
} from 'src/common/exceptions/user.exception';
import { H2Service } from 'src/h2/h2.service';
import { IPersonRepository, PERSON_REPOSITORY } from '../repositories/person-repository.interface';
import { PersonMapper } from 'src/mappers/person.mapper';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(PERSON_REPOSITORY)
    private readonly personRepository: IPersonRepository,
  ) {}

  async findAll(withPerson = false): Promise<any[]> {
    const users = await this.userRepository.findAll();
    if (!withPerson) {
      return users.map(UserMapper.fromDb).map(UserMapper.toResponseDto);
    }
    return Promise.all(
      users.map(async (userDb) => {
        const user = UserMapper.fromDb(userDb);
        const personDb = await this.personRepository.findById(user.pessoa_id);
        if (!personDb) {
          throw new UserNotFoundException();
        }
        const person = PersonMapper.fromDb(personDb);
        return UserMapper.toResponseDtoWithPerson(user, person);
      }),
    );
  }

  async findOne(id: number, withPerson = false): Promise<any> {
    const userDb = await this.userRepository.findById(id);
    if (!userDb) {
      throw new UserNotFoundException();
    }
    if (!withPerson) {
      const userDto = UserMapper.toResponseDto(UserMapper.fromDb(userDb));
      return userDto;
    }
    const user = UserMapper.fromDb(userDb);
    const personDb = await this.personRepository.findById(user.pessoa_id);
    if (!personDb) {
      throw new UserNotFoundException();
    }
    const person = PersonMapper.fromDb(personDb);
    return UserMapper.toResponseDtoWithPerson(user, person);
  }

  async create(data: UserCreateDto): Promise<UserResponseDto | null> {
    try {
      await this.userRepository.insert(data);
      const last = await this.userRepository.findLastUser();
      return last ? UserMapper.toResponseDto(UserMapper.fromDb(last)) : null;
    } catch (error: any) {
      if (error && error.message && error.message.includes(H2Service.H2_UNIQUE_CONSTRAIN)) {
        throw new UserFieldDuplicateException();
      }
      throw error;
    }
  }

  async update(id: number, data: Partial<UserCreateDto>): Promise<UserResponseDto> {
    const user = await this.findOne(id);
    await this.userRepository.update(id, data);
    return user;
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.userRepository.remove(id);
    return { deleted: true };
  }
}
