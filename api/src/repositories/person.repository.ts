import { Injectable } from '@nestjs/common';
import { H2Service } from '../h2/h2.service';
import { IPersonRepository } from './person-repository.interface';
import { Person } from '../entities/person.entity';

@Injectable()
export class PersonRepository implements IPersonRepository {
  private readonly TABLE_NAME = 'pessoas';

  constructor(private readonly h2Service: H2Service) {}

  async findAll(): Promise<Person[]> {
    const result = await this.h2Service.query(
      `SELECT id, nome, sexo, email, data_nascimento, naturalidade, nacionalidade, endereco, cpf, celular, created_at, updated_at FROM ${this.TABLE_NAME}`,
    );
    return result;
  }

  async findById(id: number): Promise<Person | null> {
    const result = await this.h2Service.query(
      `SELECT id, nome, sexo, email, data_nascimento, naturalidade, nacionalidade, endereco, cpf, celular, created_at, updated_at FROM ${this.TABLE_NAME} WHERE id = ?
            `,
      [id],
    );
    if (!result || result.length === 0) return null;
    return result[0];
  }

  async insert(data: any): Promise<void> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const fields = keys.map((k) => k).join(', ');
    const params = keys.map(() => '?').join(', ');
    const sql = `INSERT INTO ${this.TABLE_NAME} (${fields}) VALUES (${params})`;
    await this.h2Service.execute(sql, values);
  }

  async update(id: number, data: any): Promise<void> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map((k) => `${k} = ?`).join(', ');
    const sql = `UPDATE ${this.TABLE_NAME} SET ${setClause} WHERE id = ?`;
    await this.h2Service.execute(sql, [...values, id]);
  }

  async remove(id: number): Promise<void> {
    await this.h2Service.execute(`DELETE FROM ${this.TABLE_NAME} WHERE id = ?`, [id]);
  }

  async findLastPerson(): Promise<Person | null> {
    const result = await this.h2Service.query(
      `SELECT 
        id, 
        nome, 
        sexo, 
        email, 
        data_nascimento, 
        naturalidade, 
        nacionalidade, 
        endereco, 
        cpf,
        celular, 
        created_at, 
        updated_at 
            FROM ${this.TABLE_NAME} 
        ORDER BY id 
        DESC LIMIT 1`,
    );
    if (!result || result.length === 0) return null;
    return result[0];
  }
}
