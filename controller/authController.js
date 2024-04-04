import AuthModal from "./../modals/authModal.js";
import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from "jsonwebtoken";
const saltRounds = 10;
const register = async (req, res) => {
  console.log(req.body);
  const { userName, signupEmail, signupPassword } = req.body;
  console.log(userName, signupEmail, signupPassword);
  const userSchema = Joi.object({
    userName: Joi.string().min(2).max(50).required(),
    signupEmail: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "pk"] },
      })
      .required(),
    signupPassword: Joi.string().min(6).required(),
  });
  const validationResult = userSchema.validate(req.body);
  if (validationResult.error) {
    res.status(400).send({ status: validationResult.error.details[0].message });
    console.error(
      "Validation error:",
      validationResult.error.details[0].message
    );
  } else {
    // res.send({
    //   // status: "Validation successful",
    // });
    const hashPassword = await bcrypt.hash(signupPassword, saltRounds);
    try {
      const userExist = await AuthModal.findOne({ email: signupEmail });
      if (userExist) {
        return res.status(400).send({
          userExist,
          status: "User already exist",
        });
      } else {
        const addUser = await AuthModal.create({
          name: userName,
          email: signupEmail,
          password: hashPassword,
        }).then((res) => res.toObject());
        // // const newUser = await addUser.save() ;
        console.log(addUser._id);
        const token = jwt.sign({ id: addUser._id }, "hello");
        res.status(201).send({
          userExist,
          token,
          status: "User added successfully",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        error: "Internal server error",
        error,
      });
    }
  }
  // }
};
// login with mogoodb
const login = async (req, res) => {
  // console.log(req.body);
  //  get value frontend
  const { loginEmail, loginPassword } = req.body;
  // console.log(loginEmail, loginPassword);
  const userSchema = Joi.object({
    loginEmail: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "pk"] },
      })
      .required(),
    loginPassword: Joi.string().min(6).required(),
  });
  const validateResult = userSchema.validate(req.body);
  if (validateResult.error) {
    res.status(400).send({ status: validateResult.error.details[0].message });
    console.error("Validation error:", validateResult.error.details[0].message);
  } else {
    const userExist = await AuthModal.findOne({ email: loginEmail }).then(
      (res) => res.toObject()
    );
    if (userExist) {
      const matchPassword = await bcrypt.compare(
        loginPassword,
        userExist.password
      );
      if (matchPassword) {
        console.log(typeof userExist);
        delete userExist.password;
        const token = jwt.sign({ id: userExist._id }, "hello");
        res.send({
          userExist,
          token,
          status: "Logged in successfully",
        });
      } else {
        res.status(401).send({
          status: "wrong password",
        });
      }
    } else {
      res.status(404).send({
        status: "user not found",
      });
    }
  }
};

export { register, login };
