-- Tabela de configuração do sistema
CREATE TABLE IF NOT EXISTS system_config (
  id INT AUTO_INCREMENT PRIMARY KEY,
  config_key VARCHAR(100) NOT NULL UNIQUE,
  config_value VARCHAR(500),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de pessoas
CREATE TABLE IF NOT EXISTS pessoas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  sexo VARCHAR(20) CHECK (sexo IN ('MASCULINO', 'FEMININO', 'OUTRO', NULL)),
  email VARCHAR(100) UNIQUE,
  data_nascimento DATE NOT NULL,
  naturalidade VARCHAR(100),
  nacionalidade VARCHAR(100),
  cpf VARCHAR(14) NOT NULL UNIQUE,
  telefone VARCHAR(20),
  celular VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pessoa_id INT NOT NULL,
  login VARCHAR(50) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  ativo BOOLEAN DEFAULT TRUE,
  last_login_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_pessoa FOREIGN KEY (pessoa_id) REFERENCES pessoas(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_pessoas_nome ON pessoas(nome);
CREATE INDEX IF NOT EXISTS idx_pessoas_cpf ON pessoas(cpf);

-- Inserção de configuração inicial
MERGE INTO system_config (config_key, config_value) 
KEY (config_key) 
VALUES ('database_version', '1.0.0');


-- Inserção de dados de exemplo para pessoas (só insere se não existir o e-mail)
INSERT INTO pessoas (nome, sexo, email, data_nascimento, naturalidade, nacionalidade, cpf, telefone, celular)
SELECT 'Ana Silva', 'FEMININO', 'ana.silva@email.com', '1990-01-15', 'São Paulo', 'Brasileira', '123.456.789-00', '1133334444', '1199998888'
WHERE NOT EXISTS (SELECT 1 FROM pessoas WHERE email = 'ana.silva@email.com');
INSERT INTO pessoas (nome, sexo, email, data_nascimento, naturalidade, nacionalidade, cpf, telefone, celular)
SELECT 'Bruno Souza', 'MASCULINO', 'bruno.souza@email.com', '1985-05-20', 'Rio de Janeiro', 'Brasileira', '234.567.890-11', '2122223333', '2198887777'
WHERE NOT EXISTS (SELECT 1 FROM pessoas WHERE email = 'bruno.souza@email.com');
INSERT INTO pessoas (nome, sexo, email, data_nascimento, naturalidade, nacionalidade, cpf, telefone, celular)
SELECT 'Carla Dias', 'FEMININO', 'carla.dias@email.com', '1992-03-10', 'Belo Horizonte', 'Brasileira', '345.678.901-22', '3133332222', '3199991111'
WHERE NOT EXISTS (SELECT 1 FROM pessoas WHERE email = 'carla.dias@email.com');
INSERT INTO pessoas (nome, sexo, email, data_nascimento, naturalidade, nacionalidade, cpf, telefone, celular)
SELECT 'Diego Lima', 'MASCULINO', 'diego.lima@email.com', '1988-07-25', 'Curitiba', 'Brasileira', '456.789.012-33', '4133331111', '4198882222'
WHERE NOT EXISTS (SELECT 1 FROM pessoas WHERE email = 'diego.lima@email.com');
INSERT INTO pessoas (nome, sexo, email, data_nascimento, naturalidade, nacionalidade, cpf, telefone, celular)
SELECT 'Eduarda Pires', 'FEMININO', 'eduarda.pires@email.com', '1995-11-30', 'Porto Alegre', 'Brasileira', '567.890.123-44', '5133330000', '5199993333'
WHERE NOT EXISTS (SELECT 1 FROM pessoas WHERE email = 'eduarda.pires@email.com');
INSERT INTO pessoas (nome, sexo, email, data_nascimento, naturalidade, nacionalidade, cpf, telefone, celular)
SELECT 'Felipe Costa', 'MASCULINO', 'felipe.costa@email.com', '1983-09-12', 'Salvador', 'Brasileira', '678.901.234-55', '7133334444', '7198885555'
WHERE NOT EXISTS (SELECT 1 FROM pessoas WHERE email = 'felipe.costa@email.com');
INSERT INTO pessoas (nome, sexo, email, data_nascimento, naturalidade, nacionalidade, cpf, telefone, celular)
SELECT 'Gabriela Rocha', 'FEMININO', 'gabriela.rocha@email.com', '1991-12-05', 'Fortaleza', 'Brasileira', '789.012.345-66', '8533336666', '8599997777'
WHERE NOT EXISTS (SELECT 1 FROM pessoas WHERE email = 'gabriela.rocha@email.com');
INSERT INTO pessoas (nome, sexo, email, data_nascimento, naturalidade, nacionalidade, cpf, telefone, celular)
SELECT 'Henrique Alves', 'MASCULINO', 'henrique.alves@email.com', '1987-04-18', 'Recife', 'Brasileira', '890.123.456-77', '8133338888', '8199999999'
WHERE NOT EXISTS (SELECT 1 FROM pessoas WHERE email = 'henrique.alves@email.com');
INSERT INTO pessoas (nome, sexo, email, data_nascimento, naturalidade, nacionalidade, cpf, telefone, celular)
SELECT 'Isabela Martins', 'FEMININO', 'isabela.martins@email.com', '1993-06-22', 'Manaus', 'Brasileira', '901.234.567-88', '9233330000', '9298881111'
WHERE NOT EXISTS (SELECT 1 FROM pessoas WHERE email = 'isabela.martins@email.com');
INSERT INTO pessoas (nome, sexo, email, data_nascimento, naturalidade, nacionalidade, cpf, telefone, celular)
SELECT 'João Pedro', 'MASCULINO', 'joao.pedro@email.com', '1989-08-14', 'Brasília', 'Brasileira', '012.345.678-99', '6133332222', '6199993333'
WHERE NOT EXISTS (SELECT 1 FROM pessoas WHERE email = 'joao.pedro@email.com');


-- Inserção de dados de exemplo para usuários (só insere se não existir o login)
INSERT INTO usuarios (pessoa_id, login, senha)
SELECT 1, 'ana.silva', 'senha123' WHERE NOT EXISTS (SELECT 1 FROM usuarios WHERE login = 'ana.silva');
INSERT INTO usuarios (pessoa_id, login, senha)
SELECT 2, 'bruno.souza', 'senha123' WHERE NOT EXISTS (SELECT 1 FROM usuarios WHERE login = 'bruno.souza');
INSERT INTO usuarios (pessoa_id, login, senha)
SELECT 3, 'carla.dias', 'senha123' WHERE NOT EXISTS (SELECT 1 FROM usuarios WHERE login = 'carla.dias');
INSERT INTO usuarios (pessoa_id, login, senha)
SELECT 4, 'diego.lima', 'senha123' WHERE NOT EXISTS (SELECT 1 FROM usuarios WHERE login = 'diego.lima');
INSERT INTO usuarios (pessoa_id, login, senha)
SELECT 5, 'eduarda.pires', 'senha123' WHERE NOT EXISTS (SELECT 1 FROM usuarios WHERE login = 'eduarda.pires');

