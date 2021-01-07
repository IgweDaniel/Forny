const success = (res, status = 200) => (entity) => {
  res.status(status).json({ error: null, data: entity });
};

const notFound = (res) => {
  res.status(404).json({ error: "resource not found", data: null });
};

const serverError = (res, status = 500) => {
  res.status(status).json({ error: "Server Error", data: null });
};

module.exports = { serverError, notFound, success };
