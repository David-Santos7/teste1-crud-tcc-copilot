class Appointment {
  constructor({
    id,
    clientName,
    service,
    appointmentDate,
    appointmentTime,
    notes = "",
    createdAt,
    updatedAt,
  }) {
    this.id = id || null;
    this.clientName = clientName;
    this.service = service;
    this.appointmentDate = appointmentDate;
    this.appointmentTime = appointmentTime;
    this.notes = notes || "";
    this.createdAt = createdAt || null;
    this.updatedAt = updatedAt || null;
  }

  static fromPlainObject(data = {}) {
    const normalized = {
      ...data,
      clientName: typeof data.clientName === "string" ? data.clientName.trim() : "",
      service: typeof data.service === "string" ? data.service.trim() : "",
      appointmentDate: typeof data.appointmentDate === "string" ? data.appointmentDate.trim() : "",
      appointmentTime: typeof data.appointmentTime === "string" ? data.appointmentTime.trim() : "",
      notes: typeof data.notes === "string" ? data.notes.trim() : "",
    };

    if (!normalized.clientName) {
      throw new Error("O nome do cliente é obrigatório.");
    }

    if (!normalized.service) {
      throw new Error("O serviço é obrigatório.");
    }

    if (!normalized.appointmentDate) {
      throw new Error("A data do agendamento é obrigatória.");
    }

    if (!normalized.appointmentTime) {
      throw new Error("O horário do agendamento é obrigatório.");
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized.appointmentDate)) {
      throw new Error("A data deve seguir o formato YYYY-MM-DD.");
    }

    if (!/^\d{2}:\d{2}$/.test(normalized.appointmentTime)) {
      throw new Error("O horário deve seguir o formato HH:mm.");
    }

    if (normalized.notes.length > 500) {
      throw new Error("As observações devem ter no máximo 500 caracteres.");
    }

    const appointmentDateTime = new Date(`${normalized.appointmentDate}T${normalized.appointmentTime}:00`);
    const isValidDate = !Number.isNaN(appointmentDateTime.getTime());

    if (!isValidDate) {
      throw new Error("A data e o horário informados são inválidos.");
    }

    if (appointmentDateTime.getTime() < Date.now()) {
      throw new Error("Não é permitido agendar em data e horário no passado.");
    }

    return new Appointment(normalized);
  }

  toJSON() {
    return {
      id: this.id,
      clientName: this.clientName,
      service: this.service,
      appointmentDate: this.appointmentDate,
      appointmentTime: this.appointmentTime,
      notes: this.notes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = Appointment;
