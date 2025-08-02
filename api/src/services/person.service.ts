import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PersonMapper } from '../mappers/person.mapper';
import { IPersonRepository, PERSON_REPOSITORY } from '../repositories/person-repository.interface';
import { PersonResponseDto } from 'src/dtos/person/response.dto';
import { PersonCreateDto } from 'src/dtos/person/create.dto';

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
      throw new HttpException('Pessoa não encontrada', HttpStatus.NOT_FOUND);
    }
    return PersonMapper.toResponseDto(PersonMapper.fromDb(pessoa));
  }

  async create(data: PersonCreateDto): Promise<PersonResponseDto> {
    await this.personRepository.insert(data);
    const last = await this.personRepository.findLastInserted();
    return last ? PersonMapper.toResponseDto(PersonMapper.fromDb(last)) : null;
  }

  async update(id: number, data: Partial<PersonCreateDto>): Promise<PersonResponseDto> {
    await this.personRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.personRepository.remove(id);
    return { deleted: true };
  }
}
