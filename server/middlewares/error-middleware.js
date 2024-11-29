const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Back end error";
  const extraDetails = err.extraDetails || "Error from backend";

  res.status(status).json({
    msg: "Error Middleware is working now ",
    message,
    extraDetails,
  });
};

module.exports = errorMiddleware;
