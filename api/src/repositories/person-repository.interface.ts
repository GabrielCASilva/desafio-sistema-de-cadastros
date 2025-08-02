import { Pessoa } from '../entities/person.entity';
import { IRepository } from './repository.interface';

export const PERSON_REPOSITORY = Symbol('PERSON_REPOSITORY');
export interface IPersonRepository extends IRepository<Pessoa> {
  findLastPerson(): Promise<Pessoa | null>;
}
