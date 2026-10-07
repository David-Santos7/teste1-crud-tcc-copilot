class AppointmentNotFoundError extends Error {
  constructor(message = "Agendamento não encontrado.") {
    super(message);
    this.name = "AppointmentNotFoundError";
    this.statusCode = 404;
  }
}

module.exports = AppointmentNotFoundError;
