## EM DESENVOLVIMENTO ##

## Descrição
A Todo API é uma aplicação Fullstack construída com Node.js, TypeScript e React que permite aos usuários criar, ler, atualizar e deletar tarefas. A API usa Sequelize para interagir com um banco de dados PostgreSQL.

## Funcionalidades:
- Criar uma nova tarefa
- Listar todas as tarefas
- Atualizar uma tarefa existente
- Deletar uma tarefa específica
- Deletar todas as tarefas
- Mudar a cor dos cards

## Requisitos:
- Node.js v16.15.0 ou superior
- NPM v8.5.5 ou superior
- PostgreSQL

## Instalação

## Clone o repositório:
git clone https://github.com/seu-usuario/todo-api.git
cd todo-api

## Instale as dependências:
npm install
Configure o banco de dados PostgreSQL e crie um banco de dados para a aplicação.

## Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis de ambiente:
- DB_HOST=localhost
- DB_PORT=5432
- DB_NAME=nome_do_banco_de_dados
- DB_USER=seu_usuario
- DB_PASSWORD=sua_senha

## Execute as migrações para criar as tabelas no banco de dados:
npx sequelize-cli db:migrate
Inicie o servidor:
npm run dev

## Endpoints
Criar uma nova tarefa
URL: /api/todos
Método: POST

## Corpo da Requisição:
```JSON
{
  "title": "Título da tarefa",
  "description": "Descrição da tarefa"
}
```
## Resposta de sucesso:
```JSON
{
  "id": 1,
  "title": "Título da tarefa",
  "description": "Descrição da tarefa",
  "completed": false,
  "createdAt": "2024-08-07T00:00:00.000Z",
  "updatedAt": "2024-08-07T00:00:00.000Z"
}
```
## Atualizar uma tarefa existente
URL: /api/todos/:id
Método: PUT
Parâmetros de URL: id - ID da tarefa
Corpo da Requisição:
```JSON
{
  "title": "Novo título da tarefa",
  "description": "Nova descrição da tarefa"
}
```
## Resposta de sucesso:
```JSON
{
  "id": 1,
  "title": "Novo título da tarefa",
  "description": "Nova descrição da tarefa",
  "completed": false,
  "createdAt": "2024-08-07T00:00:00.000Z",
  "updatedAt": "2024-08-07T00:00:00.000Z"
}
```
Deletar uma tarefa específica
URL: /api/todos/:id
Método: DELETE
Parâmetros de URL: id - ID da tarefa
Resposta de Sucesso:
```JSON
{
  "message": "Task deleted successfully"
}
```
## Deletar todas as tarefas:
URL: /api/todos
Método: DELETE
Resposta de Sucesso:
```JSON
{
  "message": "All tasks deleted"
}
```
Tecnologias Utilizadas
- Node.js
- TypeScript
- Express
- Sequelize
- PostgreSQL
- Dotenv
- Nodemon

