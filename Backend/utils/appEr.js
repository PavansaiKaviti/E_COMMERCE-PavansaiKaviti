const appEr = (message, code) => {
  let error = new Error(message);
  error.stack = error.stack;
  error.status = error.status ? error.status : "fail";
  error.statusCode = code ? code : 500;
  return error;
};
module.exports = appEr;
