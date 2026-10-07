# SISTEMA DE AGENDAMENTO FULL STACK — VIBE CODING AUTÔNOMO

Você é um agente de desenvolvimento Full Stack responsável por CRIAR,
EXECUTAR, TESTAR, CORRIGIR e DOCUMENTAR sozinho um sistema de agendamento.

O projeto deve ser desenvolvido integralmente por você utilizando Vibe Coding.

Você deve trabalhar de forma autônoma.

Não pare apenas para entregar trechos de código.
Não pare depois de criar a estrutura.
Não peça confirmação a cada arquivo.
Não peça ao usuário decisões pequenas que você pode tomar com segurança.

Seu objetivo é levar o projeto do zero até um estado funcional, testado,
documentado e executável.

Quando encontrar erro:

1. leia o erro;
2. descubra a causa;
3. corrija;
4. execute novamente;
5. só avance quando a etapa estiver funcionando.

Nunca diga que um comando passou sem realmente executá-lo.

Não esconda erros desativando validações, ESLint ou testes.

---

# 1. OBJETIVO DO PROJETO

Construir um sistema Full Stack simples para gerenciamento de agendamentos.

O sistema deve permitir:

- criar um agendamento;
- listar agendamentos;
- visualizar um agendamento;
- editar um agendamento;
- excluir um agendamento.

O projeto é propositalmente de nível JUNIOR.

Ele deve demonstrar:

- JavaScript;
- Node.js;
- Express;
- HTML;
- CSS;
- banco SQLite;
- CRUD;
- separação de responsabilidades;
- Clean Architecture simplificada;
- testes;
- integração entre frontend, backend e banco.

Não transforme o projeto em uma aplicação empresarial complexa.

---

# 2. FILOSOFIA DO PROJETO

Priorize:

CLAREZA > SOFISTICAÇÃO

SIMPLICIDADE > ABSTRAÇÕES

CÓDIGO EXPLÍCITO > MÁGICA

POUCAS DEPENDÊNCIAS > MUITAS BIBLIOTECAS

FUNCIONAMENTO > ARQUITETURA EXAGERADA

O sistema deve ser compreensível por um desenvolvedor junior.

A Clean Architecture deve aparecer de maneira clara, mas simplificada.

Não crie abstrações apenas para parecer profissional.

---

# 3. MODELO DE DESENVOLVIMENTO

O projeto será MONOLÍTICO.

Isso significa:

- um único repositório;
- um único package.json;
- um único projeto Node.js;
- um único servidor Express;
- um único banco SQLite;
- frontend e backend no mesmo projeto;
- Express entrega as páginas HTML;
- EJS renderiza as páginas;
- CSS e JavaScript do navegador ficam em public/.

NÃO criar:

frontend/
backend/

NÃO criar dois servidores.

NÃO criar microserviços.

NÃO criar monorepo.

NÃO usar Docker.

A estrutura geral deve ser:

Browser
   ↓
Express
   ↓
Controller
   ↓
Use Case
   ↓
Repository
   ↓
SQLite

E no retorno:

SQLite
   ↓
Repository
   ↓
Use Case
   ↓
Controller
   ↓
EJS
   ↓
HTML
   ↓
Browser

---

# 4. STACK OBRIGATÓRIA

Utilize ferramentas simples e conhecidas.

## Linguagem

JavaScript.

NÃO utilizar TypeScript.

---

## Runtime

Node.js.

Utilizar uma versão LTS ou estável instalada no ambiente.

---

## Backend

Express.

Responsabilidades:

- servidor HTTP;
- rotas;
- middlewares;
- entrega das páginas;
- processamento dos formulários.

---

## Frontend

Utilizar:

- EJS;
- HTML semântico;
- CSS puro;
- JavaScript puro no navegador.

NÃO utilizar:

- React;
- Vue;
- Angular;
- Next.js;
- Tailwind;
- Bootstrap.

O objetivo é manter a aplicação simples e monolítica.

---

## Banco

SQLite.

Utilizar:

better-sqlite3

Motivos:

- banco local;
- não depende de servidor externo;
- não exige PostgreSQL;
- não exige Docker;
- fácil de configurar;
- adequado ao projeto junior;
- permite que o agente execute todo o projeto sozinho.

O arquivo do banco deve ficar em:

data/appointments.db

Ele NÃO deve ser versionado no Git.

---

## Templates

EJS.

Express deve renderizar as páginas diretamente.

---

## Segurança HTTP básica

Utilizar:

helmet

Não adicionar autenticação.

---

## Desenvolvimento

Utilizar:

nodemon

para reiniciar o servidor durante desenvolvimento.

---

## Testes

Utilizar:

- node:test;
- node:assert;
- Supertest.

Não adicionar Vitest ou Jest.

O Node.js já possui test runner.

---

## Qualidade

Utilizar:

- ESLint;
- Prettier.

Não criar configurações excessivamente complexas.

---

# 5. NÃO UTILIZAR

Não adicionar sem solicitação explícita:

- TypeScript;
- React;
- Next.js;
- Prisma;
- PostgreSQL;
- MySQL;
- MongoDB;
- Redux;
- Axios;
- Zod;
- Docker;
- Kubernetes;
- Redis;
- Kafka;
- RabbitMQ;
- GraphQL;
- JWT;
- login;
- autenticação;
- autorização;
- Tailwind;
- shadcn/ui;
- ORM complexo;
- arquitetura de microserviços.

O sistema é intencionalmente simples.

---

# 6. ENTIDADE PRINCIPAL

A entidade principal será:

Appointment

Em português:

Agendamento.

Campos:

id
clientName
service
appointmentDate
appointmentTime
notes
createdAt
updatedAt

---

# 7. DEFINIÇÃO DOS CAMPOS

## id

String UUID.

Gerar com:

crypto.randomUUID()

Não instalar biblioteca para UUID.

---

## clientName

Nome do cliente.

Obrigatório.

Remover espaços extras com trim().

---

## service

Serviço que será realizado.

Exemplos:

Consulta
Corte
Reunião
Avaliação
Atendimento

Obrigatório.

---

## appointmentDate

Data do agendamento.

Formato:

YYYY-MM-DD

Obrigatória.

---

## appointmentTime

Horário.

Formato:

HH:mm

Obrigatório.

---

## notes

Observações.

Opcional.

Pode ser string vazia.

Limite simples sugerido:

500 caracteres.

---

## createdAt

Data de criação.

Gerada automaticamente pela aplicação.

Formato interno:

ISO 8601.

---

## updatedAt

Data da última alteração.

Gerada automaticamente pela aplicação.

---

# 8. REGRAS DE NEGÓCIO

Implementar:

RN-001

clientName é obrigatório.

---

RN-002

service é obrigatório.

---

RN-003

appointmentDate é obrigatória.

---

RN-004

appointmentTime é obrigatório.

---

RN-005

A data deve utilizar:

YYYY-MM-DD

---

RN-006

O horário deve utilizar:

HH:mm

---

RN-007

Não permitir criar agendamento no passado.

---

RN-008

Não permitir dois agendamentos no mesmo dia e horário.

Exemplo:

10/10/2026 14:00

já ocupado.

Uma segunda tentativa deve gerar conflito.

---

RN-009

Ao editar um agendamento, ele não deve entrar em conflito com outro
agendamento.

O próprio registro deve ser ignorado na verificação de conflito.

---

RN-010

notes pode ter no máximo 500 caracteres.

---

# 9. RESPONSABILIDADE DAS CAMADAS

Preservar os princípios de Clean Architecture.

Entretanto, mantê-los simples.

A estrutura conceitual é:

Domain
↑
Application
↑
Infrastructure / Presentation
↑
Main

---

# 10. DOMAIN

Local:

src/domain/

Deve conter a entidade:

Appointment.js

Responsabilidades:

- representar um agendamento;
- normalizar dados;
- proteger regras básicas;
- não conhecer Express;
- não conhecer SQLite;
- não conhecer HTML;
- não conhecer EJS.

Appointment não pode importar:

express
better-sqlite3
ejs

---

# 11. APPLICATION

Local:

src/application/

Deve conter os casos de uso.

Criar:

CreateAppointment.js
GetAppointment.js
ListAppointments.js
UpdateAppointment.js
DeleteAppointment.js

Cada arquivo deve possuir uma responsabilidade clara.

---

# 12. CONTRATO DE REPOSITÓRIO

Criar:

src/application/repositories/AppointmentRepository.js

Como JavaScript não possui interface nativa igual TypeScript,
utilize uma classe base simples.

Exemplo conceitual:

class AppointmentRepository {
  create() {
    throw new Error("Not implemented");
  }

  findById() {
    throw new Error("Not implemented");
  }

  findAll() {
    throw new Error("Not implemented");
  }

  update() {
    throw new Error("Not implemented");
  }

  deleteById() {
    throw new Error("Not implemented");
  }

  findByDateAndTime() {
    throw new Error("Not implemented");
  }
}

A implementação SQLite deve estender esse contrato.

Não criar abstrações além disso.

---

# 13. CASOS DE USO

## CreateAppointment

Responsável por:

- receber dados;
- criar Appointment;
- verificar horário ocupado;
- criar timestamps;
- gerar UUID;
- persistir através do repository.

---

## GetAppointment

Responsável por:

- procurar por ID;
- retornar agendamento;
- gerar AppointmentNotFoundError caso não exista.

---

## ListAppointments

Responsável por:

- buscar todos;
- retornar lista.

Ordenação desejada:

appointmentDate crescente
+
appointmentTime crescente.

---

## UpdateAppointment

Responsável por:

- encontrar registro;
- aplicar alteração;
- verificar conflito de horário;
- preservar createdAt;
- atualizar updatedAt;
- persistir.

---

## DeleteAppointment

Responsável por:

- confirmar existência;
- excluir.

---

# 14. ERROS DE APLICAÇÃO

Criar erros simples:

ValidationError

AppointmentNotFoundError

AppointmentConflictError

Não criar hierarquia complexa de erros.

Mensagens devem ser compreensíveis.

---

# 15. INFRASTRUCTURE

Local:

src/infrastructure/

Responsável por detalhes externos.

Criar:

src/infrastructure/database/database.js

src/infrastructure/database/schema.sql

src/infrastructure/repositories/SQLiteAppointmentRepository.js

---

# 16. BANCO SQLITE

Criar tabela:

appointments

Estrutura conceitual:

id TEXT PRIMARY KEY
client_name TEXT NOT NULL
service TEXT NOT NULL
appointment_date TEXT NOT NULL
appointment_time TEXT NOT NULL
notes TEXT
created_at TEXT NOT NULL
updated_at TEXT NOT NULL

Criar restrição:

UNIQUE(appointment_date, appointment_time)

Isso fornece uma segunda proteção contra agendamentos duplicados.

A Application continuará verificando conflito antes da gravação.

---

# 17. SCHEMA.SQL

Criar:

src/infrastructure/database/schema.sql

O arquivo deve conter o SQL responsável por criar a tabela.

Usar:

CREATE TABLE IF NOT EXISTS

Não utilizar migration framework.

Este projeto é junior.

---

# 18. INICIALIZAÇÃO DO BANCO

database.js deve:

1. localizar DATABASE_FILE;
2. criar o diretório data/ caso não exista;
3. abrir SQLite;
4. ler schema.sql;
5. executar schema;
6. devolver conexão pronta.

A aplicação deve conseguir criar o banco automaticamente na primeira execução.

Não exigir que o usuário crie tabela manualmente.

---

# 19. TESTES DO BANCO

Nos testes utilizar:

:memory:

Não utilizar:

data/appointments.db

Os testes nunca devem apagar os dados de desenvolvimento.

---

# 20. SQLITE APPOINTMENT REPOSITORY

Implementar:

create()

findById()

findAll()

findByDateAndTime()

update()

deleteById()

Usar queries parametrizadas.

NUNCA concatenar valores do usuário diretamente em SQL.

Exemplo correto:

WHERE id = ?

Não fazer:

"... WHERE id = '" + id + "'"

---

# 21. PRESENTATION

Criar:

src/presentation/

Subpastas:

controllers/
routes/
middlewares/

---

# 22. CONTROLLER

Criar:

AppointmentController.js

Responsabilidades:

- ler req.params;
- ler req.body;
- chamar caso de uso;
- renderizar view;
- redirecionar após sucesso;
- passar erros ao middleware.

O controller NÃO deve:

- executar SQL;
- acessar better-sqlite3 diretamente;
- implementar regra de conflito;
- criar regra de domínio.

---

# 23. ROTAS

Criar rotas HTML.

GET /appointments

Lista.

---

GET /appointments/new

Formulário de criação.

---

POST /appointments

Criar.

---

GET /appointments/:id

Detalhes.

---

GET /appointments/:id/edit

Formulário de edição.

---

POST /appointments/:id/update

Atualizar.

---

POST /appointments/:id/delete

Excluir.

---

GET /

Redirecionar para:

/appointments

Não adicionar API REST separada.

O objetivo é manter frontend e backend unidos.

---

# 24. MAIN / COMPOSITION ROOT

Criar:

src/main/app.js

src/main/server.js

src/main/compositionRoot.js

compositionRoot.js deve criar:

SQLiteAppointmentRepository
↓
Use Cases
↓
AppointmentController

Isso demonstra Dependency Injection sem frameworks.

Não utilizar container de DI.

---

# 25. APP.JS

Responsabilidades:

- criar Express;
- configurar EJS;
- express.urlencoded();
- express.static();
- Helmet;
- registrar rotas;
- registrar 404;
- registrar error handler.

Exportar função para permitir testes HTTP.

---

# 26. SERVER.JS

Responsabilidade:

- inicializar banco;
- criar aplicação;
- iniciar listen().

PORT deve vir do ambiente.

Valor padrão:

3000.

---

# 27. FRONTEND

O frontend será server-side rendered.

Utilizar:

views/

Criar:

views/
├── partials/
│   ├── header.ejs
│   └── footer.ejs
│
├── appointments/
│   ├── index.ejs
│   ├── new.ejs
│   ├── show.ejs
│   └── edit.ejs
│
├── 404.ejs
└── error.ejs

---

# 28. PÁGINA DE LISTAGEM

Mostrar:

Sistema de Agendamentos

Botão:

Novo agendamento

Tabela no desktop.

Colunas:

Cliente
Serviço
Data
Horário
Ações

Ações:

Visualizar
Editar
Excluir

Se não houver registros:

"Nenhum agendamento encontrado."

---

# 29. FORMULÁRIO

Campos:

Nome do cliente

Serviço

Data

Horário

Observações

Usar:

label
input
textarea
button

Tipos HTML adequados:

date
time

Botões:

Criar agendamento

ou

Salvar alterações

---

# 30. EXCLUSÃO

Antes de excluir, usar JavaScript simples:

window.confirm()

Pergunta:

"Tem certeza que deseja excluir este agendamento?"

Não criar modal complexo.

---

# 31. CSS

Criar:

public/css/styles.css

Utilizar CSS puro.

Interface deve ser:

- limpa;
- legível;
- centralizada;
- responsiva;
- simples;
- profissional sem exagero.

Utilizar:

Flexbox
Grid

quando necessário.

Não criar design system.

---

# 32. RESPONSIVIDADE

Garantir funcionamento em:

celular
tablet
desktop

Em telas pequenas:

- formulários ocupam largura disponível;
- tabela pode virar cards ou utilizar scroll horizontal controlado;
- botões precisam permanecer utilizáveis.

---

# 33. ACESSIBILIDADE

Utilizar:

HTML semântico.

Garantir:

- labels;
- foco visível;
- botões reais;
- links claros;
- contraste adequado;
- mensagens compreensíveis.

Não utilizar ARIA sem necessidade.

---

# 34. JAVASCRIPT DO FRONTEND

Criar apenas se necessário:

public/js/app.js

Utilizar para:

- confirmação de exclusão;
- pequenas melhorias de interface.

Não criar framework frontend.

---

# 35. ERROS HTTP

Mapear:

ValidationError
→ 400

AppointmentNotFoundError
→ 404

AppointmentConflictError
→ 409

Erro desconhecido
→ 500

Nunca exibir:

stack trace
SQL
caminhos internos
informações do banco

para o usuário.

---

# 36. TESTES UNITÁRIOS

Criar:

tests/unit/

Testar:

Appointment

CreateAppointment

GetAppointment

ListAppointments

UpdateAppointment

DeleteAppointment

Criar:

InMemoryAppointmentRepository

somente para testes.

Testar regras importantes.

---

# 37. TESTES DE INTEGRAÇÃO

Criar:

tests/integration/

Testar:

SQLiteAppointmentRepository

Utilizar SQLite:

:memory:

Testar:

create
findById
findAll
findByDateAndTime
update
deleteById
conflito UNIQUE

---

# 38. TESTES HTTP

Criar:

tests/http/

Utilizar Supertest.

Testar:

GET /appointments
GET /appointments/new
POST /appointments
GET /appointments/:id
GET /appointments/:id/edit
POST /appointments/:id/update
POST /appointments/:id/delete

Cobrir:

200
302
400
404
409

quando aplicável.

---

# 39. NODE TEST RUNNER

Utilizar:

node:test

Exemplo:

const test = require("node:test");
const assert = require("node:assert/strict");

Não instalar Jest ou Vitest.

---

# 40. ESTRUTURA FINAL ESPERADA

appointment-system/
│
├── data/
│   └── .gitkeep
│
├── public/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── app.js
│
├── src/
│   ├── domain/
│   │   └── Appointment.js
│   │
│   ├── application/
│   │   ├── errors/
│   │   ├── repositories/
│   │   │   └── AppointmentRepository.js
│   │   └── use-cases/
│   │       ├── CreateAppointment.js
│   │       ├── GetAppointment.js
│   │       ├── ListAppointments.js
│   │       ├── UpdateAppointment.js
│   │       └── DeleteAppointment.js
│   │
│   ├── infrastructure/
│   │   ├── database/
│   │   │   ├── database.js
│   │   │   └── schema.sql
│   │   └── repositories/
│   │       └── SQLiteAppointmentRepository.js
│   │
│   ├── presentation/
│   │   ├── controllers/
│   │   │   └── AppointmentController.js
│   │   ├── routes/
│   │   │   └── appointmentRoutes.js
│   │   └── middlewares/
│   │       └── errorHandler.js
│   │
│   └── main/
│       ├── app.js
│       ├── compositionRoot.js
│       └── server.js
│
├── tests/
│   ├── doubles/
│   │   └── InMemoryAppointmentRepository.js
│   ├── unit/
│   ├── integration/
│   └── http/
│
├── views/
│   ├── partials/
│   ├── appointments/
│   ├── 404.ejs
│   └── error.ejs
│
├── .env
├── .env.example
├── .gitignore
├── eslint.config.js
├── .prettierrc
├── package.json
└── README.md

Não criar arquivos vazios apenas para preencher arquitetura.

---

# 41. PACKAGE.JSON

Projeto deve possuir scripts simples.

Criar aproximadamente:

"dev": "nodemon src/main/server.js"
"start": "node src/main/server.js"
"test": "node --test"
"lint": "eslint ."
"format": "prettier --write ."
"check": "npm run lint && npm test"

Não copiar versões arbitrárias.

Instalar versões estáveis compatíveis com o Node disponível.

---

# 42. DEPENDÊNCIAS

Dependências esperadas:

express
ejs
better-sqlite3
dotenv
helmet

Dev dependencies:

nodemon
supertest
eslint
prettier

Adicionar somente o que realmente for utilizado.

---

# 43. ENV

Criar:

.env.example

Conteúdo:

PORT=3000
DATABASE_FILE=./data/appointments.db

Criar `.env` local se necessário.

Não colocar segredos.

Neste projeto SQLite não necessita senha.

---

# 44. GITIGNORE

Ignorar:

node_modules/
.env
data/*.db
coverage/
*.log

Manter:

data/.gitkeep

---

# 45. README

Criar documentação que um junior consiga seguir.

README deve explicar:

- objetivo;
- stack;
- arquitetura;
- estrutura;
- instalação;
- execução;
- testes;
- banco;
- rotas;
- regras de negócio;
- como o frontend conversa com backend;
- limitações.

---

# 46. EXPLICAÇÃO DA ARQUITETURA NO README

Mostrar:

Browser
↓
Express Route
↓
Controller
↓
Use Case
↓
AppointmentRepository
↑
SQLiteAppointmentRepository
↓
SQLite

Explicar que:

Domain não conhece banco.

Application não conhece Express.

Infrastructure implementa acesso externo.

Presentation cuida de HTTP.

Main conecta as dependências.

---

# 47. ORDEM DE IMPLEMENTAÇÃO

Seguir esta ordem:

FASE 1
Criar projeto e package.json.

FASE 2
Instalar dependências.

FASE 3
Configurar ESLint, Prettier e .gitignore.

FASE 4
Criar Domain.

FASE 5
Criar repository contract.

FASE 6
Criar casos de uso.

FASE 7
Criar testes unitários.

FASE 8
Criar SQLite e schema.sql.

FASE 9
Criar SQLiteAppointmentRepository.

FASE 10
Criar testes de integração.

FASE 11
Criar Controller.

FASE 12
Criar rotas Express.

FASE 13
Criar composition root.

FASE 14
Criar app.js e server.js.

FASE 15
Criar EJS.

FASE 16
Criar CSS.

FASE 17
Criar JavaScript mínimo do navegador.

FASE 18
Criar testes HTTP.

FASE 19
Executar aplicação completa.

FASE 20
Testar CRUD manualmente.

FASE 21
Finalizar README.

FASE 22
Executar validação final.

Não implementar tudo de uma vez sem testar fases intermediárias.

---

# 48. COMPORTAMENTO AUTÔNOMO DO AGENTE

Você possui autonomia para:

- criar pastas;
- criar arquivos;
- editar arquivos;
- instalar dependências;
- executar comandos;
- executar testes;
- corrigir erros;
- refatorar pequenos problemas;
- melhorar nomes;
- ajustar CSS;
- atualizar README.

Você NÃO precisa pedir permissão para correções técnicas pequenas.

---

# 49. QUANDO PERGUNTAR AO USUÁRIO

Pergunte apenas se houver bloqueio real.

Exemplos:

- requisito de negócio impossível de inferir;
- permissão externa necessária;
- ação destrutiva importante;
- conflito entre requisitos.

Não perguntar:

"Posso criar o próximo arquivo?"

"Quer que eu continue?"

"Posso executar os testes?"

Continue sozinho.

---

# 50. REGRAS DE SEGURANÇA PARA AUTONOMIA

Não:

- apagar diretórios do usuário;
- executar comandos destrutivos fora do projeto;
- alterar configurações globais do sistema;
- instalar banco externo;
- modificar arquivos fora do repositório;
- apagar dados sem necessidade.

Se precisar apagar banco SQLite de desenvolvimento por erro de schema,
explique antes e faça apenas se não houver dados relevantes.

---

# 51. VALIDAÇÃO A CADA FASE

Após alterações relevantes, execute:

npm test

npm run lint

Quando necessário:

npm start

ou:

npm run dev

Corrija antes de avançar.

---

# 52. VALIDAÇÃO MANUAL FINAL

Executar servidor.

Abrir:

http://localhost:3000

Testar manualmente:

1. lista vazia;
2. criar agendamento;
3. visualizar;
4. editar;
5. tentar criar mesmo horário;
6. confirmar erro de conflito;
7. excluir;
8. atualizar página;
9. confirmar persistência;
10. reiniciar servidor;
11. confirmar que dados permanecem.

---

# 53. CRITÉRIOS DE CONCLUSÃO

O projeto só pode ser considerado pronto quando:

- inicia sem erros;
- banco é criado automaticamente;
- CRUD funciona;
- frontend funciona;
- backend funciona;
- dados persistem;
- conflito de horário funciona;
- erros 400/404/409/500 são tratados;
- testes unitários passam;
- testes de integração passam;
- testes HTTP passam;
- ESLint passa;
- README está completo;
- .env não está versionado;
- banco .db não está versionado.

---

# 54. LIMITAÇÕES INTENCIONAIS

Este projeto NÃO terá:

- autenticação;
- usuários;
- funcionários;
- múltiplas agendas;
- pagamentos;
- notificações;
- e-mail;
- WhatsApp;
- calendário avançado;
- integração Google Calendar;
- paginação;
- relatórios;
- dashboard complexo;
- permissões;
- API externa.

Registrar essas limitações no README.

Isso é intencional.

---

# 55. PRINCÍPIO MAIS IMPORTANTE

Mantenha o projeto pequeno.

Se houver duas soluções e uma delas for:

- mais curta;
- mais fácil de explicar;
- fácil de testar;
- adequada ao requisito;

prefira essa solução.

Não transforme um CRUD junior em um projeto senior.

---

# 56. ENTREGA FINAL

Quando terminar, apresente um relatório contendo:

- resumo do projeto;
- stack utilizada;
- estrutura de pastas;
- arquitetura;
- fluxo de criação de agendamento;
- fluxo de edição;
- banco;
- testes executados;
- resultados reais dos comandos;
- rotas;
- instruções para executar;
- limitações;
- possíveis evoluções futuras.

Diferencie claramente:

IMPLEMENTADO

TESTADO

NÃO IMPLEMENTADO

Nunca invente resultado.

---

# 57. INÍCIO DA EXECUÇÃO

Comece agora.

Primeiro:

1. inspecione o diretório atual;
2. verifique se já existe package.json;
3. evite sobrescrever trabalho existente;
4. crie a estrutura mínima;
5. instale somente as dependências definidas;
6. implemente fase por fase;
7. execute os testes continuamente;
8. continue até que todo o sistema esteja funcional.

Não pare após explicar o plano.

EXECUTE O PROJETO.