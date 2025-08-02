import { Injectable } from '@nestjs/common';
import { H2Service } from '../h2/h2.service';
import { IPersonRepository } from './person-repository.interface';
import { Pessoa } from '../entities/person.entity';

@Injectable()
export class PersonRepository implements IPersonRepository {
  constructor(private readonly h2Service: H2Service) {}

  async findAll(): Promise<Pessoa[]> {
    const result = await this.h2Service.query('SELECT * FROM pessoas');
    return result;
  }

  async findById(id: number): Promise<Pessoa | null> {
    const result = await this.h2Service.query('SELECT * FROM pessoas WHERE id = ?', [id]);
    if (!result || result.length === 0) return null;
    return result[0];
  }

  async insert(data: any): Promise<void> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const fields = keys.map(k => k).join(', ');
    const params = keys.map(() => '?').join(', ');
    const sql = `INSERT INTO pessoas (${fields}) VALUES (${params})`;
    await this.h2Service.execute(sql, values);
  }

  async update(id: number, data: any): Promise<void> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map(k => `${k} = ?`).join(', ');
    const sql = `UPDATE pessoas SET ${setClause} WHERE id = ?`;
    await this.h2Service.execute(sql, [...values, id]);
  }

  async remove(id: number): Promise<void> {
    await this.h2Service.execute('DELETE FROM pessoas WHERE id = ?', [id]);
  }

  async findLastInserted(): Promise<Pessoa | null> {
    const result = await this.h2Service.query('SELECT * FROM pessoas ORDER BY id DESC LIMIT 1');
    if (!result || result.length === 0) return null;
    return result[0];
  }
}
