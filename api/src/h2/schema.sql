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
  endereco VARCHAR(255),
  cpf VARCHAR(14) NOT NULL UNIQUE,
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


-- Inserção de dados de exemplo para pessoas
INSERT INTO pessoas (nome, sexo, email, data_nascimento, naturalidade, nacionalidade, endereco, cpf, celular)
VALUES ('Admin', 'MASCULINO', 'admin@email.com', '1980-01-01', 'São Paulo', 'Brasileira', 'Rua do Admin, 1', '000.000.000-00', '+55 11 99999-9999');
INSERT INTO pessoas (nome, sexo, email, data_nascimento, naturalidade, nacionalidade, endereco, cpf, celular)
VALUES ('Ana Silva', 'FEMININO', 'ana.silva@email.com', '1990-02-15', 'Campinas', 'Brasileira', 'Rua das Flores, 123', '123.456.789-00', '+55 19 98888-7777');
INSERT INTO pessoas (nome, sexo, email, data_nascimento, naturalidade, nacionalidade, endereco, cpf, celular)
VALUES ('Bruno Souza', 'MASCULINO', 'bruno.souza@email.com', '1985-05-20', 'Rio de Janeiro', 'Brasileira', NULL, '234.567.890-11', '+55 21 98877-7777');
INSERT INTO pessoas (nome, sexo, email, data_nascimento, naturalidade, nacionalidade, endereco, cpf, celular)
VALUES ('Carla Dias', 'FEMININO', 'carla.dias@email.com', '1992-03-10', 'Belo Horizonte', 'Brasileira', 'Av. Central, 456', '345.678.901-22', '+55 31 99991-1111');
INSERT INTO pessoas (nome, sexo, email, data_nascimento, naturalidade, nacionalidade, endereco, cpf, celular)
VALUES ('Diego Lima', 'MASCULINO', 'diego.lima@email.com', '1988-07-25', 'Curitiba', 'Brasileira', NULL, '456.789.012-33', '+55 41 98882-2222');
INSERT INTO pessoas (nome, sexo, email, data_nascimento, naturalidade, nacionalidade, endereco, cpf, celular)
VALUES ('Eduarda Pires', 'FEMININO', 'eduarda.pires@email.com', '1995-11-30', 'Porto Alegre', 'Brasileira', 'Rua do Sol, 789', '567.890.123-44', '+55 51 99993-3333');
INSERT INTO pessoas (nome, sexo, email, data_nascimento, naturalidade, nacionalidade, endereco, cpf, celular)
VALUES ('Felipe Costa', 'MASCULINO', 'felipe.costa@email.com', '1983-09-12', 'Salvador', 'Brasileira', NULL, '678.901.234-55', '+55 71 98885-5555');
INSERT INTO pessoas (nome, sexo, email, data_nascimento, naturalidade, nacionalidade, endereco, cpf, celular)
VALUES ('Gabriela Rocha', 'FEMININO', 'gabriela.rocha@email.com', '1991-12-05', 'Fortaleza', 'Brasileira', NULL, '789.012.345-66', '+55 85 99997-7777');
INSERT INTO pessoas (nome, sexo, email, data_nascimento, naturalidade, nacionalidade, endereco, cpf, celular)
VALUES ('Henrique Alves', 'MASCULINO', 'henrique.alves@email.com', '1987-04-18', 'Recife', 'Brasileira', NULL, '890.123.456-77', '+55 81 99999-9999');
INSERT INTO pessoas (nome, sexo, email, data_nascimento, naturalidade, nacionalidade, endereco, cpf, celular)
VALUES ('Isabela Martins', 'FEMININO', 'isabela.martins@email.com', '1993-06-22', 'Manaus', 'Brasileira', NULL, '901.234.567-88', '+55 92 98881-1111');
INSERT INTO pessoas (nome, sexo, email, data_nascimento, naturalidade, nacionalidade, endereco, cpf, celular)
VALUES ('João Pedro', 'MASCULINO', 'joao.pedro@email.com', '1989-08-14', 'Brasília', 'Brasileira', NULL, '012.345.678-99', '+55 61 99993-3333');

-- Inserção de dados de exemplo para usuários
INSERT INTO usuarios (pessoa_id, login, senha) VALUES (1, 'admin', 'admin123');
INSERT INTO usuarios (pessoa_id, login, senha) VALUES (2, 'ana.silva', 'senha123');
INSERT INTO usuarios (pessoa_id, login, senha) VALUES (3, 'bruno.souza', 'senha123');
INSERT INTO usuarios (pessoa_id, login, senha) VALUES (4, 'carla.dias', 'senha123');
INSERT INTO usuarios (pessoa_id, login, senha) VALUES (5, 'diego.lima', 'senha123');
INSERT INTO usuarios (pessoa_id, login, senha) VALUES (6, 'eduarda.pires', 'senha123');
