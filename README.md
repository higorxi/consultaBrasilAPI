# Cidade Alta API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

![Captura de tela 2024-06-17 073827](https://github.com/higorxi/CidadeAltaAPI/assets/100055740/f32caaa8-e62a-41ff-97d6-354dbd4b56e1)


## Description
Esse projeto se baseia na resolução do desafio técnico proposto pelo time da Cidade Alta, a criação de uma API para cadastro e login de usuários, atualização de informações do perfil, resgate de emblemas e ademais itens opcionais. A aplicação se encontra rodando no [FRONT-END CIDADE ALTA](https://cidade-alta-1tjjam530-higor-giovanes-projects.vercel.app/login) e o backend em [CIDADE ALTA API](cidade-alta-api.azurewebsites.net) caso queira fazer requisições para um projeto já com deploy realizado.

## 📋 Tecnologias Utilizadas

[Nest](https://github.com/nestjs/nest) .

[PostgresSQL](https://www.postgresql.org/) .

[Docker](https://www.docker.com/) .

[Swagger](https://swagger.io/) .

## 🚀 Instalando 

Para instalar o Cidade Alta API, siga estas etapas:

### 1. Clone o repositório:

Primeiro, clone o repositório do projeto para a sua máquina local. Abra um terminal e execute o seguinte comando:

```bash
$ git clone <URL-do-repositório>
```

### 2.Navegue até o diretório do projeto:

Depois de clonar o repositório, entre no diretório do projeto:

```bash
$ cd <nome-do-diretório-do-projeto>
```

### 3.Instale as dependências:

Instale todas as dependências do projeto usando npm (ou yarn, se preferir):

```bash
$ npm install
```

Ou, se estiver usando yarn:

```bash
$ yarn install
```
## Adicionando variáveis de ambiente

```sh
cp .env.example .env
```

## Executando o APP

```bash
$ docker compose up --build
```

Agora devemos ter um container Docker rodando no seu computador e sendo possível acessar a porta do Back-End configurada

```bash
$ http://localhost:3000
```

## Caso queira rodar apenas o back-end sem o PostgresSQL no Docker (o que irá ocasionar erro se não for configurado corretamente o Postgres local

### Installation

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 💻 Documentação da API

A documentação da API foi realizada via Swagger, para acessar, basta rodar o container ou apenas o Back-End e acessar: http://localhost:3000/api-docs

Nesse link você irá encontrar um Drive com um arquivo para Insomnia ou Postman com alguns corpos de requisições principais: [Google Drive](https://drive.google.com/drive/folders/1ccMQSPYO3jZeFRpD-89FXbv_3R1jwCLh?usp=sharing).

## 🎯 Requisitos atendidos
- [x]  Persistência de dados.
- [x]  A API deve ser implementa utilizando NodeJS e NestJS.
- [x]  A API deve armazenar informações em um banco de dados. Você pode escolher o banco que achar melhor. Preferencialmente utilizamos MySQL (Utilizei PostgresSql).
- [x]  Permitir que o usuário edite seu perfil, adicionando informações como nome e foto de perfil(A lógica das fotos estou tentando fazer algo como um microserviço para salvar no MongoDB e ocupar menos espaço em um banco igual Postgres.
- [x]  Implementar diferentes categorias de emblemas (e.g., bronze, prata, ouro).
- [x]  Documentar os endpoints da API, utilizando por exemplo Swagger.
- [x]  Permitir que os usuários filtrem e pesquisem emblemas em seu dashboard.
- [x]  Autenticação de usuário, com cadastro e login utilizando email e senha
- [x]  Os emblemas resgatados devem ser salvos no banco de dados e associados ao usuário.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).


## License

Nest is [MIT licensed](LICENSE).
