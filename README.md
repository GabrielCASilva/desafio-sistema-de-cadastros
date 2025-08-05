# Desafio - Sistema de Cadastros

Este projeto é um sistema completo de cadastro de pessoas e usuários, desenvolvido com NestJS (backend) e Vite/React (frontend). Ele inclui autenticação, controle de acesso, integração com banco H2 e testes automatizados.

## Funcionalidades

- Cadastro, listagem, edição e remoção de pessoas
- Cadastro e autenticação de usuários
- Controle de acesso por autenticação JWT
- API documentada com Swagger
- Testes automatizados para controllers e serviços

## Estrutura do Projeto

```
desafio-sistema-de-cadastros/
|-- api/      # Backend NestJS
|-- front/    # Frontend React + Vite

```

## Como rodar o projeto

### Pré-requisitos

- nvm ( Não é obrigatório )
- Node.js 18+
- npm
- java 21

### Backend (API)

1. Acesse a pasta do backend:

   ```bash
   cd api
   ```

2. Habilitando a versão correta do node:

   ```bash
   nvm use
   ```

3. Instale as dependências:

   ```bash
   npm install --legacy-peer-deps
   ```

4. Inicie o banco h2:

   ```bash
   npm run start:h2
   ```

5. Rode a aplicação:

   ```bash
   npm run start:dev
   ```

6. Acesse a documentação Swagger em: [http://localhost:3000/doc](http://localhost:3000/doc)

#### Testes Backend

- Para rodar os testes automatizados:

  ```bash
  npm run test
  ```

- Para ver a conbertura de testes:

  ```bash
  npm run test:coverage
  ```

### Frontend (Vite + React)

1. Acesse a pasta do frontend:

   ```bash
   cd front
   ```

2. Habilitando a versão correta do node:

   ```bash
   nvm use
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Rode o frontend:
   ```bash
   npm run dev
   ```
5. Acesse o sistema em: [http://localhost:5173](http://localhost:5173)

## Banco de Dados

O projeto utiliza H2 Database (arquivo local). O schema é criado e alimentado automaticamente ao rodar a API.

## Estrutura das Pastas Importantes

- `api/src/controllers/` — Controllers da API
- `api/src/services/` — Lógica de negócio
- `api/src/entities/` — Entidades do domínio
- `api/src/dtos/` — Data Transfer Objects
- `api/test/` — Testes automatizados
- `front/src/pages/` — Páginas do frontend
- `front/src/services/` — Serviços de integração com a API
