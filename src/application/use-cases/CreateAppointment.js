const { randomUUID } = require("node:crypto");
const Appointment = require("../../domain/Appointment");
const { AppointmentConflictError } = require("../errors");

class CreateAppointment {
  constructor({ appointmentRepository }) {
    this.appointmentRepository = appointmentRepository;
  }

  execute(data) {
    const appointment = Appointment.fromPlainObject(data);
    const existingAppointment = this.appointmentRepository.findByDateAndTime(
      appointment.appointmentDate,
      appointment.appointmentTime
    );

    if (existingAppointment) {
      throw new AppointmentConflictError("Já existe um agendamento para este dia e horário.");
    }

    const now = new Date().toISOString();
    appointment.id = randomUUID();
    appointment.createdAt = now;
    appointment.updatedAt = now;

    return this.appointmentRepository.create(appointment);
  }
}

module.exports = CreateAppointment;
