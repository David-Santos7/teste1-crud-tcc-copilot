const test = require("node:test");
const assert = require("node:assert/strict");
const { createDatabase } = require("../../src/infrastructure/database/database");
const SQLiteAppointmentRepository = require("../../src/infrastructure/repositories/SQLiteAppointmentRepository");
const Appointment = require("../../src/domain/Appointment");

function buildRepository() {
  const database = createDatabase(":memory:");
  return new SQLiteAppointmentRepository(database);
}

test("SQLiteAppointmentRepository creates and finds appointments", () => {
  const repository = buildRepository();
  const appointment = Appointment.fromPlainObject({
    clientName: "Lucas",
    service: "Consulta",
    appointmentDate: "2100-01-10",
    appointmentTime: "09:30",
    notes: "Teste",
  });

  const created = repository.create({
    ...appointment,
    id: "appointment-1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  assert.equal(created.clientName, "Lucas");
  assert.equal(repository.findById("appointment-1").clientName, "Lucas");
});

test("SQLiteAppointmentRepository respects unique constraint", () => {
  const repository = buildRepository();

  const firstAppointment = Appointment.fromPlainObject({
    clientName: "João",
    service: "Consulta",
    appointmentDate: "2100-02-12",
    appointmentTime: "16:00",
  });

  repository.create({
    ...firstAppointment,
    id: "appointment-2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const duplicate = Appointment.fromPlainObject({
    clientName: "Carlos",
    service: "Reunião",
    appointmentDate: "2100-02-12",
    appointmentTime: "16:00",
  });

  assert.throws(() => {
    repository.create({
      ...duplicate,
      id: "appointment-3",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  });
});

test("SQLiteAppointmentRepository updates and deletes records", () => {
  const repository = buildRepository();
  const appointment = Appointment.fromPlainObject({
    clientName: "Ana",
    service: "Avaliação",
    appointmentDate: "2100-03-15",
    appointmentTime: "14:45",
  });

  repository.create({
    ...appointment,
    id: "appointment-4",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const updated = repository.update("appointment-4", {
    ...appointment,
    id: "appointment-4",
    clientName: "Ana Silva",
    service: "Atendimento",
    appointmentDate: "2100-03-16",
    appointmentTime: "15:00",
    notes: "Atualizado",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  assert.equal(updated.clientName, "Ana Silva");
  assert.equal(repository.deleteById("appointment-4"), true);
  assert.equal(repository.findById("appointment-4"), null);
});
