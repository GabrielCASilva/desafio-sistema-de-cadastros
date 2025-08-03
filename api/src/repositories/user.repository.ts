import { Injectable } from '@nestjs/common';
import { H2Service } from '../h2/h2.service';
import { IUserRepository } from './user-repository.interface';
import { IRepository } from './repository.interface';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository, IRepository<User> {
  private readonly TABLE_NAME = 'usuarios';
  constructor(private readonly h2Service: H2Service) {}

  async findAll(): Promise<User[]> {
    return this.h2Service.query(
      `SELECT id, pessoa_id, login, senha, ativo, last_login_at, created_at, updated_at FROM ${this.TABLE_NAME}`,
    );
  }

  async findById(id: number): Promise<User | null> {
    const result = await this.h2Service.query(
      `SELECT id, pessoa_id, login, senha, ativo, last_login_at, created_at, updated_at FROM ${this.TABLE_NAME} WHERE id = ?`,
      [id],
    );
    return result[0] || null;
  }

  async insert(data: Partial<User>): Promise<void> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const fields = keys.map((k) => k).join(', ');
    const params = keys.map(() => '?').join(', ');
    const sql = `INSERT INTO ${this.TABLE_NAME} (${fields}) VALUES (${params})`;
    await this.h2Service.execute(sql, values);
  }

  async findLastUser(): Promise<User | null> {
    const result = await this.h2Service.query(
      `SELECT id, pessoa_id, login, senha, ativo, last_login_at, created_at, updated_at FROM ${this.TABLE_NAME} ORDER BY id DESC LIMIT 1`,
    );
    return result[0] || null;
  }

  async findByLogin(login: string): Promise<User | null> {
    const result = await this.h2Service.query(
      `SELECT id, pessoa_id, login, senha, ativo, last_login_at, created_at, updated_at FROM ${this.TABLE_NAME} WHERE login = ?`,
      [login],
    );
    return result[0] || null;
  }

  async update(id: number, data: Partial<User>): Promise<void> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map((k) => `${k} = ?`).join(', ');
    const sql = `UPDATE ${this.TABLE_NAME} SET ${setClause} WHERE id = ?`;
    await this.h2Service.execute(sql, [...values, id]);
  }

  async remove(id: number): Promise<void> {
    await this.h2Service.execute(`DELETE FROM ${this.TABLE_NAME} WHERE id = ?`, [id]);
  }
}
