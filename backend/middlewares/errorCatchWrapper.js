const errorCatch = (errorFunc) => (req, res, next) => {
  errorFunc(req, res, next).catch((err) => next(err));
};

module.exports = errorCatch