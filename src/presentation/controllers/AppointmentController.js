class AppointmentController {
  constructor({
    createAppointmentUseCase,
    getAppointmentUseCase,
    listAppointmentsUseCase,
    updateAppointmentUseCase,
    deleteAppointmentUseCase,
  }) {
    this.createAppointmentUseCase = createAppointmentUseCase;
    this.getAppointmentUseCase = getAppointmentUseCase;
    this.listAppointmentsUseCase = listAppointmentsUseCase;
    this.updateAppointmentUseCase = updateAppointmentUseCase;
    this.deleteAppointmentUseCase = deleteAppointmentUseCase;
  }

  listAppointments(req, res, next) {
    try {
      const appointments = this.listAppointmentsUseCase.execute();
      res.render("appointments/index", {
        title: "Sistema de Agendamentos",
        appointments,
      });
    } catch (error) {
      next(error);
    }
  }

  newAppointmentForm(req, res) {
    res.render("appointments/new", {
      title: "Novo agendamento",
      appointment: null,
      errorMessage: null,
    });
  }

  createAppointment(req, res, next) {
    const appointmentData = { ...req.body };

    try {
      const appointment = this.createAppointmentUseCase.execute(appointmentData);
      res.redirect(`/appointments/${appointment.id}`);
    } catch (error) {
      const statusCode = error.statusCode || 400;

      if (statusCode === 400 || statusCode === 409) {
        res.status(statusCode).render("appointments/new", {
          title: "Novo agendamento",
          appointment: appointmentData,
          errorMessage: error.message,
        });
        return;
      }

      next(error);
    }
  }

  showAppointment(req, res, next) {
    try {
      const appointment = this.getAppointmentUseCase.execute(req.params.id);
      res.render("appointments/show", {
        title: "Detalhes do agendamento",
        appointment,
      });
    } catch (error) {
      next(error);
    }
  }

  editAppointmentForm(req, res, next) {
    try {
      const appointment = this.getAppointmentUseCase.execute(req.params.id);
      res.render("appointments/edit", {
        title: "Editar agendamento",
        appointment,
        errorMessage: null,
      });
    } catch (error) {
      next(error);
    }
  }

  updateAppointment(req, res, next) {
    const appointmentData = { ...req.body };

    try {
      const appointment = this.updateAppointmentUseCase.execute(req.params.id, appointmentData);
      res.redirect(`/appointments/${appointment.id}`);
    } catch (error) {
      const statusCode = error.statusCode || 400;

      if (statusCode === 400 || statusCode === 409) {
        const appointment = this.getAppointmentUseCase.execute(req.params.id);
        res.status(statusCode).render("appointments/edit", {
          title: "Editar agendamento",
          appointment: { ...appointment, ...appointmentData },
          errorMessage: error.message,
        });
        return;
      }

      next(error);
    }
  }

  deleteAppointment(req, res, next) {
    try {
      this.deleteAppointmentUseCase.execute(req.params.id);
      res.redirect("/appointments");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AppointmentController;
