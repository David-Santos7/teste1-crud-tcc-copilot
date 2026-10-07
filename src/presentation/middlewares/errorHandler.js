function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  const statusCode = Number(error.statusCode || 500);
  const message =
    statusCode === 500
      ? "Ocorreu um erro inesperado. Tente novamente mais tarde."
      : error.message;

  res.status(statusCode).render("error", {
    title: "Erro",
    statusCode,
    message,
  });
}

module.exports = errorHandler;
