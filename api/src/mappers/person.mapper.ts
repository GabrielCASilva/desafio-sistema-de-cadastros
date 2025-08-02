import { PersonResponseDto } from 'src/dtos/person/response.dto';
import { Pessoa } from '../entities/person.entity';

export class PersonMapper {
  static toIsoStringOrNull(val: any): string | null {
    if (!val) return null;
    if (typeof val === 'object' && val !== null && typeof val.toISOString === 'function') {
      return val.toISOString();
    }
    if (typeof val === 'object' && val !== null && val.toString) {
      const str = val.toString();
      if (/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(str)) {
        return str.replace(' ', 'T') + 'Z';
      }
      return str;
    }
    return val;
  }

  static fromDb(db: any): Pessoa {
    return {
      id: db.ID,
      nome: db.NOME,
      sexo: db.SEXO,
      email: db.EMAIL,
      data_nascimento: db.DATA_NASCIMENTO,
      naturalidade: db.NATURALIDADE,
      nacionalidade: db.NACIONALIDADE,
      cpf: db.CPF,
      telefone: db.TELEFONE,
      celular: db.CELULAR,
      created_at: db.CREATED_AT,
      updated_at: db.UPDATED_AT,
    };
  }

  static toResponseDto(person: Pessoa): PersonResponseDto {
    return {
      id: person.id,
      nome: person.nome,
      sexo: person.sexo,
      email: person.email,
      data_nascimento: person.data_nascimento,
      naturalidade: person.naturalidade,
      nacionalidade: person.nacionalidade,
      cpf: person.cpf,
      telefone: person.telefone,
      celular: person.celular,
      created_at: PersonMapper.toIsoStringOrNull(person.created_at),
      updated_at: PersonMapper.toIsoStringOrNull(person.updated_at),
    };
  }
}
