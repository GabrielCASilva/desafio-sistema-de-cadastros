// src/mappers/user.mapper.ts

export function mapDbUserToModel(db: any) {
  return {
    id: db.ID,
    pessoaId: db.PESSOA_ID,
    login: db.LOGIN,
    ativo: db.ATIVO,
    lastLoginAt: db.LAST_LOGIN_AT,
    createdAt: db.CREATED_AT,
    updatedAt: db.UPDATED_AT,
  };
}
