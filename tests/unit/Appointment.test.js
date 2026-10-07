const test = require("node:test");
const assert = require("node:assert/strict");
const Appointment = require("../../src/domain/Appointment");
const CreateAppointment = require("../../src/application/use-cases/CreateAppointment");
const UpdateAppointment = require("../../src/application/use-cases/UpdateAppointment");
const DeleteAppointment = require("../../src/application/use-cases/DeleteAppointment");
const InMemoryAppointmentRepository = require("../doubles/InMemoryAppointmentRepository");

function getFutureDate() {
  const now = new Date(Date.now() + 60 * 60 * 1000);
  return {
    date: now.toISOString().slice(0, 10),
    time: now.toISOString().slice(11, 16),
  };
}

test("Appointment.fromPlainObject validates required fields", () => {
  assert.throws(() => Appointment.fromPlainObject({}), /nome do cliente/i);
  assert.throws(() => Appointment.fromPlainObject({ clientName: "Maria", service: "" }), /serviço/i);
});

test("Appointment.fromPlainObject rejects past dates", () => {
  assert.throws(
    () =>
      Appointment.fromPlainObject({
        clientName: "Maria",
        service: "Consulta",
        appointmentDate: "2000-01-01",
        appointmentTime: "08:00",
      }),
    /passado/i
  );
});

test("CreateAppointment creates a valid appointment", () => {
  const repository = new InMemoryAppointmentRepository();
  const useCase = new CreateAppointment({ appointmentRepository: repository });
  const future = getFutureDate();

  const appointment = useCase.execute({
    clientName: "Maria",
    service: "Consulta",
    appointmentDate: future.date,
    appointmentTime: future.time,
    notes: "Primeira consulta",
  });

  assert.equal(appointment.clientName, "Maria");
  assert.equal(appointment.service, "Consulta");
  assert.ok(appointment.id);
});

test("CreateAppointment rejects duplicate appointment time", () => {
  const repository = new InMemoryAppointmentRepository();
  const useCase = new CreateAppointment({ appointmentRepository: repository });
  const future = getFutureDate();

  useCase.execute({
    clientName: "Maria",
    service: "Consulta",
    appointmentDate: future.date,
    appointmentTime: future.time,
  });

  assert.throws(
    () =>
      useCase.execute({
        clientName: "João",
        service: "Reunião",
        appointmentDate: future.date,
        appointmentTime: future.time,
      }),
    /já existe um agendamento/i
  );
});

test("UpdateAppointment ignores the same appointment while checking conflict", () => {
  const repository = new InMemoryAppointmentRepository();
  const createUseCase = new CreateAppointment({ appointmentRepository: repository });
  const updateUseCase = new UpdateAppointment({ appointmentRepository: repository });
  const future = getFutureDate();

  const created = createUseCase.execute({
    clientName: "Maria",
    service: "Consulta",
    appointmentDate: future.date,
    appointmentTime: future.time,
  });

  const updated = updateUseCase.execute(created.id, {
    clientName: "Maria Souza",
    service: "Avaliação",
    appointmentDate: future.date,
    appointmentTime: future.time,
  });

  assert.equal(updated.clientName, "Maria Souza");
  assert.equal(updated.service, "Avaliação");
});

test("DeleteAppointment removes an appointment", () => {
  const repository = new InMemoryAppointmentRepository();
  const createUseCase = new CreateAppointment({ appointmentRepository: repository });
  const deleteUseCase = new DeleteAppointment({ appointmentRepository: repository });
  const future = getFutureDate();

  const created = createUseCase.execute({
    clientName: "Pedro",
    service: "Corte",
    appointmentDate: future.date,
    appointmentTime: future.time,
  });

  assert.equal(deleteUseCase.execute(created.id), true);
  assert.equal(repository.findById(created.id), null);
});
