require("dotenv").config();

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers["authorization"].replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      req.decoded = decoded;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).send({
          status: "error",
          message: "Expired",
        });
      } else {
        console.log(error);
        return res.status(401).send({
          status: "error",
          message: "Not Authorised",
        });
      }
    }
  } else {
    return res.status(403).json({
      status: "error",
      message: "missing token",
    });
  }
};

module.exports = auth;
