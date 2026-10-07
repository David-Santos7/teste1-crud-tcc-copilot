const path = require("node:path");
const express = require("express");
const helmet = require("helmet");
const createAppointmentRoutes = require("../presentation/routes/appointmentRoutes");
const errorHandler = require("../presentation/middlewares/errorHandler");

function createApp({ controller }) {
  const app = express();

  app.set("views", path.join(__dirname, "../../views"));
  app.set("view engine", "ejs");

  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "../../public")));

  app.use(createAppointmentRoutes(controller));

  app.use((req, res) => {
    res.status(404).render("404", {
      title: "Página não encontrada",
    });
  });

  app.use(errorHandler);

  return app;
}

module.exports = {
  createApp,
};
