const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //get toke from header
  const token = req.header('x-auth-token');

  //check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token auth denied' });
  }

  //veruify
  try {
    const decoded = jwt.verify(token, config.get('secretOrKey'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'token not valid' });
  }
};
