module.exports = (status, message) => {
  const error = new Error(message);
  error.status = status;
  console.log(error);
  return error;
};
