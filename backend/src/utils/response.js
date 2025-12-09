export const sendSuccess = (res, status, message = "Success", data) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

export const sendError = (res, status, message = "Error") => {
  return res.status(status).json({
    success: false,
    message,
  });
};
