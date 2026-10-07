const express = require("express");

function createAppointmentRoutes(controller) {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.redirect("/appointments");
  });

  router.get("/appointments", controller.listAppointments.bind(controller));
  router.get("/appointments/new", controller.newAppointmentForm.bind(controller));
  router.post("/appointments", controller.createAppointment.bind(controller));
  router.get("/appointments/:id", controller.showAppointment.bind(controller));
  router.get("/appointments/:id/edit", controller.editAppointmentForm.bind(controller));
  router.post("/appointments/:id/update", controller.updateAppointment.bind(controller));
  router.post("/appointments/:id/delete", controller.deleteAppointment.bind(controller));

  return router;
}

module.exports = createAppointmentRoutes;
