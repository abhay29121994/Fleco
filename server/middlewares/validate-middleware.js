const validateMiddleware = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    // const message = error.message[0];
    // res.status(400).json({ msg: message });
    const status = 422;
    const message = "Fill the input properly";
    const extraDetails = err.errors[0].message;

    const error = {
      status,
      message,
      extraDetails,
      err,
    };
    console.log(
      "Validate Midlleware catch block is executed because of error ---" + err
    );
    next(error);
  }
};

module.exports = validateMiddleware;
