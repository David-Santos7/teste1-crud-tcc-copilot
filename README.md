# Sistema de Agendamentos

Aplicação full stack para gerenciar agendamentos com Node.js, Express, SQLite e EJS.

## Objetivo

- criar agendamentos;
- listar agendamentos;
- visualizar detalhes;
- editar agendamento;
- excluir agendamento.

## Stack

- JavaScript
- Node.js
- Express
- EJS
- SQLite com better-sqlite3
- HTML/CSS/JavaScript puro
- Supertest para testes HTTP

## Arquitetura

A aplicação segue uma arquitetura simples em camadas:

Browser
?
Express Route
?
Controller
?
Use Case
?
AppointmentRepository
?
SQLiteAppointmentRepository
?
SQLite

O domínio não conhece banco, Express ou HTML. A infraestrutura implementa o acesso ao banco e a apresentação cuida do HTTP.

## Estrutura

- src/domain: entidade Appointment
- src/application: use cases e contrato do repositório
- src/infrastructure: SQLite e schema
- src/presentation: controllers, rotas e middleware
- src/main: composição de dependências
- views: páginas renderizadas
- public: CSS e JavaScript do navegador
- tests: testes unitários, de integração e HTTP

## Instalação

1. Instale as dependências:
   npm install
2. Configure o arquivo .env a partir do .env.example, se necessário.
3. Inicie a aplicação:
   npm run dev

## Execução

- desenvolvimento: npm run dev
- produção: npm start
- testes: npm test
- lint: npm run lint

## Banco de dados

O banco SQLite fica em data/appointments.db por padrão. O sistema cria a pasta e a tabela automaticamente na primeira execução.

## Regras de negócio

- nome do cliente é obrigatório;
- serviço é obrigatório;
- data e horário são obrigatórios;
- data deve estar em YYYY-MM-DD;
- horário deve estar em HH:mm;
- não é permitido agendar no passado;
- não é permitido ter dois agendamentos no mesmo dia e horário;
- observações têm limite de 500 caracteres.

## Rotas

- GET / -> redireciona para /appointments
- GET /appointments -> lista
- GET /appointments/new -> formulário de criação
- POST /appointments -> criar
- GET /appointments/:id -> detalhes
- GET /appointments/:id/edit -> formulário de edição
- POST /appointments/:id/update -> atualizar
- POST /appointments/:id/delete -> excluir

## Como o frontend conversa com o backend

O frontend é server-side rendered com EJS. O navegador envia formulários HTML para o Express, que chama os casos de uso, persiste os dados e renderiza as páginas novamente.

## Limitações

Este projeto intencionalmente não inclui:

- autenticação;
- usuários e funcionários;
- múltiplas agendas;
- pagamentos;
- notificações;
- integração com e-mail/WhatsApp;
- calendário avançado;
- paginação;
- relatórios;
- dashboard complexo.

## Testes

Os testes usam node:test e podem ser executados com:

npm test

Para verificar lint e testes em conjunto:

npm run check

## Execução manual

1. Abra http://localhost:3000
2. Crie um agendamento
3. Veja a listagem
4. Edite ou exclua registros
5. Verifique que o banco persiste no arquivo data/appointments.db

## Arquitetura em resumo

Browser -> Express -> Controller -> Use Case -> Repository -> SQLite

## Observações

A estrutura foi mantida simples e clara para demonstrar Clean Architecture de forma didática, sem overengineering.
