// middlewares/adminOnly.js
module.exports = function (req, res, next) {
    if (req.session.user && req.session.user.isAdmin === true) {
      next();
    } else {
      res.status(403).send("Access denied. Admins only.");
    }
  };
  