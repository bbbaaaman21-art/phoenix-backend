module.exports = (req, res, next) => {
  const token = req.query.token;

  if (!token || token !== process.env.INVOICE_TOKEN) {
    return res.status(403).send("Forbidden");
  }

  next();
};
