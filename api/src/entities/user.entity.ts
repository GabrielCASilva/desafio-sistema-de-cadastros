
export class User {
  id: number;
  pessoa_id: number;
  login: string;
  senha?: string;
  ativo?: boolean;
  last_login_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  pessoa?: any;
}
