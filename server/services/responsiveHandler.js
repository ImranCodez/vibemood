const sendResponse = (
  res,
  statusCode = 200,
  third,
  fourth,
  fifth = null,
  error = null,
) => {
  let success;
  let message;
  let data;

  if (typeof third === "boolean") {
    success = third;
    message = fourth || "Success";
    data = fifth;
  } else if (typeof fourth === "boolean") {
    message = third || "Success";
    success = fourth;
    data = fifth;
  } else {
    success = statusCode < 400;
    message = third || "Success";
    data = fourth ?? null;
  }

  return res.status(statusCode).json({
    success,
    message,
    data,
    error,
  });
};
module.exports = sendResponse;
