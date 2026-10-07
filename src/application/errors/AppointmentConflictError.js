class AppointmentConflictError extends Error {
  constructor(message = "Já existe um agendamento para este horário.") {
    super(message);
    this.name = "AppointmentConflictError";
    this.statusCode = 409;
  }
}

module.exports = AppointmentConflictError;
