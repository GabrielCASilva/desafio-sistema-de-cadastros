import { Inject, Injectable } from '@nestjs/common';
import { PersonMapper } from '../mappers/person.mapper';
import { IPersonRepository, PERSON_REPOSITORY } from '../repositories/person-repository.interface';
import { PersonResponseDto } from 'src/dtos/person/response.dto';
import { PersonCreateDto } from 'src/dtos/person/create.dto';
import {
  PersonFieldDuplicateException,
  PersonNotFoundException,
} from 'src/common/exceptions/person.exception';
import { H2Service } from 'src/h2/h2.service';

@Injectable()
export class PessoaService {
  constructor(
    @Inject(PERSON_REPOSITORY)
    private readonly personRepository: IPersonRepository,
  ) {}

  async findAll(): Promise<PersonResponseDto[]> {
    const pessoas = await this.personRepository.findAll();
    return pessoas.map(PersonMapper.fromDb).map(PersonMapper.toResponseDto);
  }

  async findOne(id: number): Promise<PersonResponseDto> {
    const pessoa = await this.personRepository.findById(id);
    if (!pessoa) {
      throw new PersonNotFoundException();
    }
    return PersonMapper.toResponseDto(PersonMapper.fromDb(pessoa));
  }

  async create(data: PersonCreateDto): Promise<PersonResponseDto> {
    try {
      await this.personRepository.insert(data);
      const last = await this.personRepository.findLastPerson();
      return last ? PersonMapper.toResponseDto(PersonMapper.fromDb(last)) : null;
    } catch (error: any) {
      // H2 lança erro 23505 para violação de unique constraint
      if (error && error.message && error.message.includes(H2Service.H2_UNIQUE_CONSTRAIN)) {
        throw new PersonFieldDuplicateException();
      }
      throw error;
    }
  }

  async update(id: number, data: Partial<PersonCreateDto>): Promise<PersonResponseDto> {
    const person = await this.findOne(id);
    await this.personRepository.update(id, data);
    return person;
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.personRepository.remove(id);
    return { deleted: true };
  }
}
