const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWTSTR);
    if (decodedToken.isAdmin) {
      req.userData = decodedToken;
      next();
    } else if (!decodedToken.isAdmin) {
      throw Error;
    }
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};
