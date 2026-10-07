class ListAppointments {
  constructor({ appointmentRepository }) {
    this.appointmentRepository = appointmentRepository;
  }

  execute() {
    return this.appointmentRepository
      .findAll()
      .sort((firstAppointment, secondAppointment) => {
        const firstDateTime = new Date(
          `${firstAppointment.appointmentDate}T${firstAppointment.appointmentTime}:00`
        );
        const secondDateTime = new Date(
          `${secondAppointment.appointmentDate}T${secondAppointment.appointmentTime}:00`
        );

        return firstDateTime - secondDateTime;
      });
  }
}

module.exports = ListAppointments;
