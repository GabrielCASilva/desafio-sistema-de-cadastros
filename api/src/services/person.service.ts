import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PersonMapper } from '../mappers/person.mapper';
import { IPersonRepository, PERSON_REPOSITORY } from '../repositories/person-repository.interface';
import { PersonResponseDto } from 'src/dtos/person/response.dto';
import { PersonCreateDto } from 'src/dtos/person/create.dto';
import {
  PersonFieldDuplicateException,
  PersonNotFoundException,
} from 'src/common/exceptions/person.exception';
import { H2Service } from 'src/h2/h2.service';
import { PersonCreateV2Dto } from 'src/dtos/person/create-v2.dto';

@Injectable()
export class PersonService {
  constructor(
    @Inject(PERSON_REPOSITORY)
    private readonly personRepository: IPersonRepository,
  ) {}

  async findAll(): Promise<PersonResponseDto[]> {
    const pessoas = await this.personRepository.findAll();
    return pessoas.map(PersonMapper.fromDb).map(PersonMapper.toResponseDto);
  }

  async findOne(id: number): Promise<PersonResponseDto> {
    const pessoa = await this._findPerson(id);
    return PersonMapper.toResponseDto(PersonMapper.fromDb(pessoa));
  }

  async createV1(data: PersonCreateDto): Promise<PersonResponseDto> {
    return await this.create(data);
  }

  async createV2(data: PersonCreateV2Dto): Promise<PersonResponseDto> {
    return await this.create(data);
  }

  private async create(data: PersonCreateDto | PersonCreateV2Dto): Promise<PersonResponseDto> {
    try {
      await this.personRepository.insert(data);
      const last = await this.personRepository.findLastPerson();
      return last ? PersonMapper.toResponseDto(PersonMapper.fromDb(last)) : null;
    } catch (error: any) {
      if (error?.message?.includes(H2Service.H2_UNIQUE_CONSTRAIN)) {
        throw new PersonFieldDuplicateException(HttpStatus.CONFLICT);
      }
      throw error;
    }
  }

  async update(id: number, data: Partial<PersonCreateDto>): Promise<PersonResponseDto> {
    await this._findPerson(id);
    await this.personRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.personRepository.remove(id);
  }

  async _findPerson(id: number): Promise<PersonResponseDto> {
    const person = await this.personRepository.findById(id);
    if (!person) {
      throw new PersonNotFoundException();
    }
    return person;
  }
}
