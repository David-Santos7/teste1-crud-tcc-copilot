const AppointmentRepository = require("../../application/repositories/AppointmentRepository");

class SQLiteAppointmentRepository extends AppointmentRepository {
  constructor(database) {
    super();
    this.database = database;
  }

  mapRow(row) {
    return {
      id: row.id,
      clientName: row.client_name,
      service: row.service,
      appointmentDate: row.appointment_date,
      appointmentTime: row.appointment_time,
      notes: row.notes || "",
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  create(appointment) {
    const statement = this.database.prepare(`
      INSERT INTO appointments (
        id,
        client_name,
        service,
        appointment_date,
        appointment_time,
        notes,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    statement.run(
      appointment.id,
      appointment.clientName,
      appointment.service,
      appointment.appointmentDate,
      appointment.appointmentTime,
      appointment.notes,
      appointment.createdAt,
      appointment.updatedAt
    );

    return this.findById(appointment.id);
  }

  findById(id) {
    const row = this.database
      .prepare("SELECT * FROM appointments WHERE id = ?")
      .get(id);

    return row ? this.mapRow(row) : null;
  }

  findAll() {
    const rows = this.database
      .prepare("SELECT * FROM appointments ORDER BY appointment_date ASC, appointment_time ASC")
      .all();

    return rows.map((row) => this.mapRow(row));
  }

  findByDateAndTime(date, time) {
    const row = this.database
      .prepare("SELECT * FROM appointments WHERE appointment_date = ? AND appointment_time = ?")
      .get(date, time);

    return row ? this.mapRow(row) : null;
  }

  update(id, appointment) {
    const statement = this.database.prepare(`
      UPDATE appointments
      SET
        client_name = ?,
        service = ?,
        appointment_date = ?,
        appointment_time = ?,
        notes = ?,
        updated_at = ?
      WHERE id = ?
    `);

    statement.run(
      appointment.clientName,
      appointment.service,
      appointment.appointmentDate,
      appointment.appointmentTime,
      appointment.notes,
      appointment.updatedAt,
      id
    );

    return this.findById(id);
  }

  deleteById(id) {
    const appointment = this.findById(id);

    if (!appointment) {
      return false;
    }

    this.database.prepare("DELETE FROM appointments WHERE id = ?").run(id);
    return true;
  }
}

module.exports = SQLiteAppointmentRepository;
