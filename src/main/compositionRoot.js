const { createDatabase } = require("../infrastructure/database/database");
const SQLiteAppointmentRepository = require("../infrastructure/repositories/SQLiteAppointmentRepository");
const CreateAppointment = require("../application/use-cases/CreateAppointment");
const GetAppointment = require("../application/use-cases/GetAppointment");
const ListAppointments = require("../application/use-cases/ListAppointments");
const UpdateAppointment = require("../application/use-cases/UpdateAppointment");
const DeleteAppointment = require("../application/use-cases/DeleteAppointment");
const AppointmentController = require("../presentation/controllers/AppointmentController");

function createCompositionRoot(databaseInstance) {
  const database = databaseInstance || createDatabase(process.env.DATABASE_FILE || "./data/appointments.db");
  const appointmentRepository = new SQLiteAppointmentRepository(database);

  const createAppointmentUseCase = new CreateAppointment({ appointmentRepository });
  const getAppointmentUseCase = new GetAppointment({ appointmentRepository });
  const listAppointmentsUseCase = new ListAppointments({ appointmentRepository });
  const updateAppointmentUseCase = new UpdateAppointment({ appointmentRepository });
  const deleteAppointmentUseCase = new DeleteAppointment({ appointmentRepository });

  const controller = new AppointmentController({
    createAppointmentUseCase,
    getAppointmentUseCase,
    listAppointmentsUseCase,
    updateAppointmentUseCase,
    deleteAppointmentUseCase,
  });

  return {
    database,
    appointmentRepository,
    controller,
    createAppointmentUseCase,
    getAppointmentUseCase,
    listAppointmentsUseCase,
    updateAppointmentUseCase,
    deleteAppointmentUseCase,
  };
}

module.exports = {
  createCompositionRoot,
};
