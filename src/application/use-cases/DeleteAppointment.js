const { AppointmentNotFoundError } = require("../errors");

class DeleteAppointment {
  constructor({ appointmentRepository }) {
    this.appointmentRepository = appointmentRepository;
  }

  execute(id) {
    const appointment = this.appointmentRepository.findById(id);

    if (!appointment) {
      throw new AppointmentNotFoundError("Agendamento não encontrado.");
    }

    return this.appointmentRepository.deleteById(id);
  }
}

module.exports = DeleteAppointment;
