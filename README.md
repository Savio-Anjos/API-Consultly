<p align='center'><img width='400' src="./.github/logo.svg"/></p>

 <p align='center'>

<img src="https://img.shields.io/github/repo-size/Savio-Anjos/API-Consultly?color=1890FF">
<img src="https://img.shields.io/github/languages/count/Savio-Anjos/API-Consultly?color=1890FF">
<img src="https://img.shields.io/github/last-commit/Savio-Anjos/API-Consultly?color=1890FF">  
</p>

## 🚀 Tecnologias

Esse projeto está utilizando as seguintes tecnologias:

- [Node](https://nodejs.org/en)
- [Fastify](https://fastify.dev/)
- [Vitest](https://vitest.dev/)
- [Docker](https://www.docker.com/)
- [Prisma](https://www.prisma.io//)

## 📜 Descrição

Esse projeto busca tentar fascilitar o contato entre consultores/recrutadores
e candidados. Nele os consultores cadastram os horários disponíveis para reuniões
e os candidatos marcam reunões nesses horários.

## ⚙️ Como funciona?

## RFs (Requisitos funcionais)

- [x] É possível fazer o cadastro como usuário.
- [x] É possível fazer o cadastro como consultor.
- [x] É possível fazer login como usuário.
- [x] É possível fazer login como consultor.
- [x] É possível listar todos as horários de um consultor.
- [x] É possível listar todas as reuniões de um usuário.
- [x] É possivel listar todas as reuniões de um consultor.
- [x] É possivel listar todas as reuniões de um determinado usuário e consultor.
- [x] Consultores podem cadastrar horários.
- [x] Consultores podem deletar horários.
- [x] Usuários podem marcar reuniões
- [x] Usuários podem deletar reuniões.

## RNs (Regras de negócio)

- [x] O título da reunião é uma junção do nome
      do consultor com o nome do usuário.

## Rotas da aplicação

A seguir estão as principais rotas da aplicação:

### Usuários

- **POST** `/users`: Cria um novo usuário.
- **POST** `/users/auth`: Autentica um usuário.

### Consultores

- **POST** `/consultants`: Cria um novo consultor.
- **POST** `/consultants/auth`: Autentica um consultor.

### Disponibilidades

- **POST** `/availabilities`: Cria uma nova disponibilidade de consultor.
- **GET** `/availabilities/:id`: Lista as disponibilidades de um consultor específico.
- **DELETE** `/availabilities/:id`: Deleta uma disponibilidade de consultor.

### Reuniões

- **POST** `/meetings`: Cria uma nova reunião.
- **DELETE** `/meetings/:id`: Deleta uma reunião.
- **GET** `/meetings/user/:id`: Lista todas as reuniões de um usuário.
- **GET** `/meetings/consultant/:id`: Lista todas as reuniões de um consultor.
- **GET** `/meetings/:userId/:consultantId`: Lista todas as reuniões entre um usuário e um consultor.

## 🎲 Quer customizar o projeto?

### Clone esse repositório

```bash
git clone https://github.com/Savio-Anjos/API-Consultly.git
```

### Navegue até o diretório do projeto

```bash
cd API-Consultly
```

### Instale as dependências

```bash
npm i
```

```bash
yarn
```

### Execute o docker compose

```bash
docker compose up
```

### Execute o docker

```bash
docker start
```

### Rode as migrations

```bash
npx prisma migrate dev
```

### Inicie a aplicação

```bash
npm run start:dev
```

---

<p>Criado com 💙 por <a href='https://github.com/Savio-Anjos/' target='_blank'>Sávio Anjos</a></p>
