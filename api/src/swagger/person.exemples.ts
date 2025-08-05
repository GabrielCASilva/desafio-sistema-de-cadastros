export const PersonCreateExamplesV1 = {
  campos_obrigatorios: {
    value: {
      nome: 'João Marcelo Nascimento',
      data_nascimento: '1990-01-01',
      cpf: '123.456.789-09',
    },
  },
  campos_sem_endereco: {
    value: {
      nome: 'Ana Silva Costa Araujo',
      sexo: 'FEMININO',
      email: 'anasiltacosta@gmail.com',
      data_nascimento: '1990-01-01',
      naturalidade: 'São Paulo',
      nacionalidade: 'Brasileira',
      cpf: '123.456.789-01',
      celular: '+55 11 99999-8888',
    },
  },
  campos_com_endereco: {
    value: {
      nome: 'Fátima Silva Costa Araujo',
      sexo: 'FEMININO',
      email: 'fatimasiltacosta@gmail.com',
      data_nascimento: '1990-01-01',
      naturalidade: 'São Paulo',
      nacionalidade: 'Brasileira',
      endereco: 'Rua Exemplo, 123',
      cpf: '123.456.789-02',
      celular: '+55 11 99999-8888',
    },
  },
  campos_erro_validacao_email: {
    value: {
      nome: 'Joelma Castro Silveira',
      sexo: 'FEMININO',
      email: 'joelmacastrosilveiragmail.com',
      data_nascimento: '1990-01-01',
      naturalidade: 'São Paulo',
      nacionalidade: 'Brasileira',
      cpf: '123.456.789-03',
      celular: '+55 11 99999-8888',
    },
  },
  campos_erro_validacao_data_nascimento: {
    value: {
      nome: 'Joelma Castro Silveira',
      sexo: 'FEMININO',
      email: 'joelmacastrosilveira@gmail.com',
      data_nascimento: '19900101',
      naturalidade: 'São Paulo',
      nacionalidade: 'Brasileira',
      cpf: '123.456.789-03',
      celular: '+55 11 99999-8888',
    },
  },
  campos_erro_validacao_cpf: {
    value: {
      nome: 'Joelma Castro Silveira',
      sexo: 'FEMININO',
      email: 'joelmacastrosilveira@gmail.com',
      data_nascimento: '1990-01-01',
      naturalidade: 'São Paulo',
      nacionalidade: 'Brasileira',
      cpf: '12345678903',
      celular: '+55 11 99999-8888',
    },
  },
};

export const PersonCreateExamplesV2 = {
  campos_obrigatorios: {
    value: {
      nome: 'João Marcelo Nascimento',
      data_nascimento: '1990-01-01',
      endereco: 'Rua Exemplo, 123',
      cpf: '123.456.789-09',
    },
  },
  campos_todos: {
    value: {
      nome: 'Fátima Silva Costa Araujo',
      sexo: 'FEMININO',
      email: 'fatimasiltacosta@gmail.com',
      data_nascimento: '1990-01-01',
      naturalidade: 'São Paulo',
      nacionalidade: 'Brasileira',
      endereco: 'Rua Exemplo, 123',
      cpf: '123.456.789-02',
      celular: '+55 11 99999-8888',
    },
  },
  campos_erro_validacao_endereco: {
    value: {
      nome: 'Fátima Silva Costa Araujo',
      sexo: 'FEMININO',
      email: 'fatimasiltacosta@gmail.com',
      data_nascimento: '1990-01-01',
      naturalidade: 'São Paulo',
      nacionalidade: 'Brasileira',
      cpf: '123.456.789-02',
      celular: '+55 11 99999-8888',
    },
  },
  campos_erro_validacao_email: {
    value: {
      nome: 'Joelma Castro Silveira',
      sexo: 'FEMININO',
      email: 'joelmacastrosilveiragmail.com',
      data_nascimento: '1990-01-01',
      naturalidade: 'São Paulo',
      nacionalidade: 'Brasileira',
      endereco: 'Rua Exemplo, 123',
      cpf: '123.456.789-03',
      celular: '+55 11 99999-8888',
    },
  },
  campos_erro_validacao_data_nascimento: {
    value: {
      nome: 'Joelma Castro Silveira',
      sexo: 'FEMININO',
      email: 'joelmacastrosilveira@gmail.com',
      data_nascimento: '19900101',
      naturalidade: 'São Paulo',
      nacionalidade: 'Brasileira',
      endereco: 'Rua Exemplo, 123',
      cpf: '123.456.789-03',
      celular: '+55 11 99999-8888',
    },
  },
  campos_erro_validacao_cpf: {
    value: {
      nome: 'Joelma Castro Silveira',
      sexo: 'FEMININO',
      email: 'joelmacastrosilveira@gmail.com',
      data_nascimento: '1990-01-01',
      naturalidade: 'São Paulo',
      nacionalidade: 'Brasileira',
      cpf: '12345678903',
      celular: '+55 11 99999-8888',
    },
  },
};

export const PersonResponseExemple = {
  id: 1,
  nome: 'Ana Silva Costa',
  sexo: 'FEMININO',
  email: 'ana.silva@email.com',
  data_nascimento: '1990-01-15',
  naturalidade: 'São Paulo',
  nacionalidade: 'Brasileira',
  endereco: 'Rua das Flores, 123',
  cpf: '123.456.789-00',
  celular: '+55 11 99999-8888',
  created_at: '2025-08-02T20:52:47.434865Z',
  updated_at: '2025-08-04T22:10:54.563531Z',
};
