import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { H2Service } from '../h2/h2.service';
import { mapDbUserToModel } from '../mappers/user.mapper';

@Injectable()
export class UserService {
  constructor(private readonly h2Service: H2Service) {}

  async findAll() {
    const users = await this.h2Service.query('SELECT * FROM usuarios');
    return users.map(mapDbUserToModel);
  }

  async findOne(id: number) {
    const result = await this.h2Service.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    if (!result || result.length === 0) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return mapDbUserToModel(result[0]);
  }

  async create(data: any) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const fields = keys.map(k => k).join(', ');
    const params = keys.map(() => '?').join(', ');
    const sql = `INSERT INTO usuarios (${fields}) VALUES (${params})`;
    await this.h2Service.query(sql, values);
    const result = await this.h2Service.query('SELECT * FROM usuarios ORDER BY id DESC LIMIT 1');
    return result[0];
  }

  async update(id: number, data: any) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map(k => `${k} = ?`).join(', ');
    const sql = `UPDATE usuarios SET ${setClause} WHERE id = ?`;
    await this.h2Service.query(sql, [...values, id]);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.h2Service.query('DELETE FROM usuarios WHERE id = ?', [id]);
    return { deleted: true };
  }
}
