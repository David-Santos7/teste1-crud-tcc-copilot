const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const { createDatabase } = require("../../src/infrastructure/database/database");
const { createCompositionRoot } = require("../../src/main/compositionRoot");
const { createApp } = require("../../src/main/app");

function buildApp() {
  const database = createDatabase(":memory:");
  const { controller } = createCompositionRoot(database);
  return createApp({ controller });
}

test("GET /appointments renders the listing page", async () => {
  const app = buildApp();
  const response = await request(app).get("/appointments");

  assert.equal(response.status, 200);
  assert.match(response.text, /Sistema de Agendamentos/i);
});

test("GET /appointments/new renders create form", async () => {
  const app = buildApp();
  const response = await request(app).get("/appointments/new");

  assert.equal(response.status, 200);
  assert.match(response.text, /Novo agendamento/i);
});

test("POST /appointments creates a new appointment and redirects", async () => {
  const app = buildApp();
  const response = await request(app).post("/appointments").type("form").send({
    clientName: "Maria",
    service: "Consulta",
    appointmentDate: "2100-10-10",
    appointmentTime: "14:00",
    notes: "Primeira consulta",
  });

  assert.equal(response.status, 302);
  assert.match(response.headers.location, /^\/appointments\//);
});

test("GET /appointments/:id returns the appointment details", async () => {
  const app = buildApp();
  const created = await request(app).post("/appointments").type("form").send({
    clientName: "Maria",
    service: "Consulta",
    appointmentDate: "2100-10-11",
    appointmentTime: "15:00",
    notes: "Detalhes",
  });

  const response = await request(app).get(created.headers.location);
  assert.equal(response.status, 200);
  assert.match(response.text, /Detalhes do agendamento/i);
});

test("GET /appointments/:id/edit renders the edit form", async () => {
  const app = buildApp();
  const created = await request(app).post("/appointments").type("form").send({
    clientName: "Pedro",
    service: "Consulta",
    appointmentDate: "2100-10-12",
    appointmentTime: "16:00",
  });

  const response = await request(app).get(`${created.headers.location}/edit`);
  assert.equal(response.status, 200);
  assert.match(response.text, /Editar agendamento/i);
});

test("POST /appointments/:id/update updates the appointment", async () => {
  const app = buildApp();
  const created = await request(app).post("/appointments").type("form").send({
    clientName: "João",
    service: "Atendimento",
    appointmentDate: "2100-10-13",
    appointmentTime: "17:00",
  });

  const response = await request(app)
    .post(`${created.headers.location}/update`)
    .type("form")
    .send({
      clientName: "João Santos",
      service: "Avaliação",
      appointmentDate: "2100-10-13",
      appointmentTime: "17:30",
      notes: "Atualizado",
    });

  assert.equal(response.status, 302);
  assert.match(response.headers.location, /^\/appointments\//);
});

test("POST /appointments/:id/delete removes the appointment", async () => {
  const app = buildApp();
  const created = await request(app).post("/appointments").type("form").send({
    clientName: "Ana",
    service: "Corte",
    appointmentDate: "2100-10-14",
    appointmentTime: "08:30",
  });

  const response = await request(app).post(`${created.headers.location}/delete`);
  assert.equal(response.status, 302);
  assert.equal(response.headers.location, "/appointments");
});
