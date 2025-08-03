export const SEXO_ENUM = ['MASCULINO', 'FEMININO', 'OUTRO'] as const;
export class Person {
  endereco?: string;
  id: number;
  nome: string;
  sexo?: string;
  email?: string;
  data_nascimento: string;
  naturalidade?: string;
  nacionalidade?: string;
  cpf: string;
  celular?: string;
  created_at?: string | null;
  updated_at?: string | null;
}
