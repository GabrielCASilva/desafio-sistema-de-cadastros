import { UserResponseDto } from 'src/dtos/user/response.dto';
import { User } from '../entities/user.entity';

export class UserMapper {
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

  static fromDb(db: any): User {
    return {
      id: db.ID,
      pessoa_id: db.PESSOA_ID,
      login: db.LOGIN,
      ativo: db.ATIVO,
      last_login_at: UserMapper.toIsoStringOrNull(db.LAST_LOGIN_AT),
      created_at: UserMapper.toIsoStringOrNull(db.CREATED_AT),
      updated_at: UserMapper.toIsoStringOrNull(db.UPDATED_AT),
    };
  }

  static toResponseDtoWithPerson(user: User, person: any): any {
    return {
      id: user.id,
      pessoa: person,
      login: user.login,
      ativo: user.ativo,
      last_login_at: user.last_login_at,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  static toResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      pessoa_id: user.pessoa_id,
      login: user.login,
      ativo: user.ativo,
      last_login_at: user.last_login_at,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  // ...existing code...
  // ...existing code...
}
