
export class User {
  id: number;
  pessoa_id: number;
  login: string;
  senha: string;
  ativo?: boolean;
  last_login_at?: Date;
  created_at?: Date;
  updated_at?: Date;
  pessoa?: any;
}
