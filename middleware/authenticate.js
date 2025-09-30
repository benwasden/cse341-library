const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  if (req.user) return next();
  if (req.session && req.session.user) return next();

  return res.status(401).json({ message: 'You do not have access.' });
};

module.exports = { isAuthenticated };