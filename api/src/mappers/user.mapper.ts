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
}
