## Book Management

Projeto para aprimorar os conhecimentos em NestJS. Este projeto consiste em desenvolver um backend para gerenciar livros, aluguéis e usuários de uma livraria generica.

## Descrição

O CRUD deste sistema contém as seguintes entidades:

<details close="close">
<summary>Livros (Books)</summary>

- **id:** Identificador único do livro.
- **quantity:** Quantidade deste livro.
- **title:** Título do livro.
- **description:** Descrição do livro.
- **quantity:** Quantidade do livro.
- **price:** Preço do livro.
- **publication_date:** Data de publicação do livro.
- **author_id:** Identificador do autor do livro.
- **categorie_id:** Identificador da categoria do livro.
- **created_at:** Data de criação do registro.
- **update_at:** Data da última atualização do registro.
</details>

<details close="close">
<summary>Autores (Authors)</summary>

- **id:** Identificador único do autor.
- **name:** Nome do autor.
- **biography:** Biografia do autor.
- **created_at:** Data de criação do registro.
- **update_at:** Data da última atualização do registro.
</details>

<details close="close">
<summary>Categorias (Categories)</summary>

- **id:** Identificador único da categoria.
- **name:** Nome da categoria.
- **created_at:** Data de criação do registro.
- **update_at:** Data da última atualização do registro.
</details>

<details close="close">
<summary>Usuários (Users)</summary>

- **id:** Identificador único do usuário.
- **name:** Nome do usuário.
- **email:** Email do usuário.
- **password:** Senha do usuário.
- **role:** Papel do usuário (ADMIN ou USER).
- **score:** Valor para determinar prioridade na reserva dos livros.
- **penalty_end_date:** Data de fim da penalidade.
- **birth_at:** Data do aniversário.
- **created_at:** Data de criação do registro.
- **update_at:** Data da última atualização do registro.
</details>


<details close="close">
<summary>Reservas (Reservations)</summary>

- **id:** Identificador único da reserva.
- **book_id:** Identificador do livro reservado.
- **user_id:** Identificador do usuário que fez a reserva.
- **reservation_date:** Data da reserva.
- **due_date:** Data de vencimento da reserva.
- **status:** Status da reserva (RESERVED, RETURNED, LATE).
- **created_at:** Data de criação do registro.
- **update_at:** Data da última atualização do registro.
</details>

<i>Observação: As entidades podem ser validadas no arquivo schema.prisma</i>

**https://docs.nestjs.com/techniques/task-scheduling#declarative-cron-jobs**

## End Points

## Instalação

```bash
$ npm install
```

## Executando o aplicativo

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
