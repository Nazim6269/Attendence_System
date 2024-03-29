const successResponse = (
  res,
  statusCode = 400,
  message = {},
  success = true,
  payload = {}
) => {
  return res.status(statusCode).send({
    message,
    success,
    payload,
  });
};

const errorResponse = (
  res,
  statusCode = 200,
  message = "",
  success = false
) => {
  return res.status(statusCode).send({
    message,
    success,
  });
};

module.exports = { successResponse, errorResponse };
