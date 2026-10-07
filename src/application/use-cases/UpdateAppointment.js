const Appointment = require("../../domain/Appointment");
const { AppointmentConflictError, AppointmentNotFoundError } = require("../errors");

class UpdateAppointment {
  constructor({ appointmentRepository }) {
    this.appointmentRepository = appointmentRepository;
  }

  execute(id, data) {
    const currentAppointment = this.appointmentRepository.findById(id);

    if (!currentAppointment) {
      throw new AppointmentNotFoundError("Agendamento não encontrado.");
    }

    const nextAppointmentData = {
      ...currentAppointment,
      ...data,
      id,
      createdAt: currentAppointment.createdAt,
    };

    const appointment = Appointment.fromPlainObject(nextAppointmentData);
    const appointmentInConflict = this.appointmentRepository.findByDateAndTime(
      appointment.appointmentDate,
      appointment.appointmentTime
    );

    if (appointmentInConflict && appointmentInConflict.id !== id) {
      throw new AppointmentConflictError("Já existe outro agendamento para este dia e horário.");
    }

    appointment.updatedAt = new Date().toISOString();

    return this.appointmentRepository.update(id, appointment);
  }
}

module.exports = UpdateAppointment;
