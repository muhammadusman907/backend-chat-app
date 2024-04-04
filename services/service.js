import jwt from "jsonwebtoken";
const verifyTokan = async (req, res, next) => {
  // console.log(req.headers.authorization);
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    //  console.log(token);
    jwt.verify(token, "hello", function (err, decoded) {
      if (err) {
        // console.log(decoded.foo);
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
export { verifyTokan };
