const AppointmentRepository = require("../../src/application/repositories/AppointmentRepository");

class InMemoryAppointmentRepository extends AppointmentRepository {
  constructor(initialAppointments = []) {
    super();
    this.appointments = initialAppointments.map((appointment) => ({ ...appointment }));
  }

  create(appointment) {
    const record = { ...appointment };
    this.appointments.push(record);
    return { ...record };
  }

  findById(id) {
    const appointment = this.appointments.find((item) => item.id === id);
    return appointment ? { ...appointment } : null;
  }

  findAll() {
    return this.appointments
      .slice()
      .sort((firstAppointment, secondAppointment) => {
        const firstDateTime = new Date(
          `${firstAppointment.appointmentDate}T${firstAppointment.appointmentTime}:00`
        );
        const secondDateTime = new Date(
          `${secondAppointment.appointmentDate}T${secondAppointment.appointmentTime}:00`
        );

        return firstDateTime - secondDateTime;
      })
      .map((appointment) => ({ ...appointment }));
  }

  findByDateAndTime(date, time) {
    const appointment = this.appointments.find(
      (item) => item.appointmentDate === date && item.appointmentTime === time
    );

    return appointment ? { ...appointment } : null;
  }

  update(id, appointment) {
    const index = this.appointments.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    this.appointments[index] = { ...appointment };
    return { ...this.appointments[index] };
  }

  deleteById(id) {
    const index = this.appointments.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;
    }

    this.appointments.splice(index, 1);
    return true;
  }
}

module.exports = InMemoryAppointmentRepository;
