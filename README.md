# Desafio Técnico: Sistema de Enfileiramento e Processamento Simples com CRUD na API

## Objetivo

Neste desafio, o objetivo é construir um sistema simples de enfileiramento e processamento de mensagens usando AWS Lambda, AWS SQS, AWS SNS, Docker, API em Python ou Node.js e um banco de dados PostgreSQL ou MySQL.

## Tecnologias a serem utilizadas

-   **AWS Lambda**: Utilize as funções Lambda da AWS para processar as mensagens em tempo real.
-   **AWS SQS**: Utilize o serviço Simple Queue Service (SQS) da AWS para gerenciar as filas de mensagens.
-   **AWS SNS**: Utilize o serviço Simple Notification Service (SNS) da AWS para notificar os clientes sobre o status do processamento.
-   **Docker**: Crie containers para hospedar a API em Python ou Node.js e o banco de dados PostgreSQL ou MySQL.

## Requisitos

-   Docker
-   Ambiente de desenvolvimento
    -   Node.js v18.17.0

## Estrutura de arquivos

```plaintext
.
├── api
│   ├── nodejs
│   │   ├── src
│   │   │   ├── controllers
│   │   │   │   └── messageController.ts
│   │   │   ├── database
│   │   │   │   └── index.ts
│   │   │   ├── migrations
│   │   │   │   └── messageMigrations.ts
│   │   │   ├── models
│   │   │   │   ├── index.ts
│   │   │   │   ├── interfaces.ts
│   │   │   │   └── Message.ts
│   │   │   ├── routes
│   │   │   │   └── messageRoutes.ts
│   │   │   ├── utils
│   │   │   │   ├── index.ts
│   │   │   │   ├── interfaces.ts
│   │   │   │   └── wait-for-db.ts
│   │   │   ├── index.ts
│   │   │   ├── Dockerfile
│   │   │   ├── package-lock.json
│   │   │   ├── package.json
│   │   │   └── tsconfig.json
│   │   └── README.md
│   └── README.md
├── aws
│   ├── lambda_function
│   │   └── lambda_function.py
│   ├── receiveMessage.py
│   ├── sendMessage.py
│   └── README.md
├── database
│   ├── mysql
│   │   ├── README.md
│   │   └── init
│   │       └── grants.sql
│   ├── Dockerfile
│   └── README.md
└── docker-compose.yml
```

## Configurando o projeto

A maior parte da configuração do projeto está alocada em `docker-compose.yml` localizado na raiz do projeto conforme informado na estrutura de arquivos.

**Atenção às variáveis de ambiente obrigatórias**:

**Banco de dados (db)**:

-   `MYSQL_ROOT_PASSWORD`: Adicionar a senha root do banco de dados
-   `MYSQL_DATABASE`: Adicionar o nome da base de dados

**Aplicação (app)**:

-   `API_HOST`: Adicionar o HOST(IP) da API
-   `API_PORT`: Adicionar a porta do HOST da API
-   `DB_HOST`: Adicionar o endereço do HOST do banco de dados
-   `DB_USER`: Adicionar o usuário do banco de dados
-   `DB_NAME`: Adicionar a base de dados
-   `DB_PASS`: Adicionar a senha do usuário do banco de dados. Importante adicionar todos os privilégios necessários para este usuário
-   `DB_DIALECT`: Adicionar qual banco de dados será utilizado

> **OBS**: Em `database/mysql/init` existe o arquivo `grants.sql` que é executado quando o docker inicia o ambiente de banco de dados. Neste arquivo existe instruções em SQL para a criação de um usuário separado bem como fornecer todos os privilégios necessário para este usuário. Este passo pode ser alterado ou removido através do arquivo `docker-compose.yml`.

## Executando o projeto

1.  Primeiro clone o projeto
2.  Acesse a pasta do projeto
3.  Inicie o docker se ainda não iniciou
4.  Execute o comando: `docker-compose up --build`
5.  Aguarde até que a mensagem de: '[server]: Server is running at....' apareça no console.

## Outras informações e configuração

Nas pastas:

-   `api`
-   `api/nodejs`
-   `aws`
-   `database`
-   `database/mysql`

Há READMEs adicionais que contêm informações.
