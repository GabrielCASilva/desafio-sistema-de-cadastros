import { IRepository } from './repository.interface';
import { User } from '../entities/user.entity';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
export interface IUserRepository extends IRepository<User> {
  findLastUser(): Promise<User | null>;
  findByLogin(login: string): Promise<User | null>;
}
