const jwt = require("jsonwebtoken");

const verifyTokan = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "hello", function (err, decoded) {
      if (err) {
        res.status(400).send({
          status: err,
        });
      } else {
        next();
      }
    });
  } catch (error) {
    return res.status(500).send({
      status: error,
    });
  }
};

module.exports = { verifyTokan };
