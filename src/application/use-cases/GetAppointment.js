const { AppointmentNotFoundError } = require("../errors");

class GetAppointment {
  constructor({ appointmentRepository }) {
    this.appointmentRepository = appointmentRepository;
  }

  execute(id) {
    const appointment = this.appointmentRepository.findById(id);

    if (!appointment) {
      throw new AppointmentNotFoundError("Agendamento não encontrado.");
    }

    return appointment;
  }
}

module.exports = GetAppointment;
