import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { H2Service } from '../h2/h2.service';
import { CreatePessoaDto } from '../dtos/create-pessoa.dto';

@Injectable()
export class PessoaService {
  constructor(private readonly h2Service: H2Service) {}

  async findAll() {
    return this.h2Service.query('SELECT * FROM pessoas');
  }

  async findOne(id: number) {
    const result = await this.h2Service.query('SELECT * FROM pessoas WHERE id = ?', [id]);
    if (!result || result.length === 0) {
      throw new HttpException('Pessoa não encontrada', HttpStatus.NOT_FOUND);
    }
    return result[0];
  }

  async create(data: CreatePessoaDto) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const fields = keys.map(k => k).join(', ');
    const params = keys.map(() => '?').join(', ');
    const sql = `INSERT INTO pessoas (${fields}) VALUES (${params})`;
    await this.h2Service.query(sql, values);
    const result = await this.h2Service.query('SELECT * FROM pessoas ORDER BY id DESC LIMIT 1');
    return result[0];
  }

  async update(id: number, data: Partial<CreatePessoaDto>) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map(k => `${k} = ?`).join(', ');
    const sql = `UPDATE pessoas SET ${setClause} WHERE id = ?`;
    await this.h2Service.query(sql, [...values, id]);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.h2Service.query('DELETE FROM pessoas WHERE id = ?', [id]);
    return { deleted: true };
  }
}
