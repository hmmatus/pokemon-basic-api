const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { checkIfUserExists, createUser } = require("../../middlewares/user");
const { userSchema } = require("../../schema/user");
const User = require("../../db/models/user.model");

let user = (module.exports = {});

user.signUp = async (req, res) => {
  let body = req.body;
  const userExists = await checkIfUserExists(req.body);
  if (userExists.status) {
    return res.status(400).json({
      msg: userExists.error || "Email already exists",
    });
  }
  const { error, value } = userSchema.validate({
    name: body.name,
    email: body.email,
  });
  if (!error) {
    let result = createUser(body);
    result
      .then((user) => {
        res.json({
          name: user.name,
          email: user.email,
        });
      })
      .catch((error) => {
        res.status(400).json({
          error,
        });
      });
  } else {
    res.status(400).json({
      error,
    });
  }
};

user.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((data) => {
      if (data) {
        const passwordValid = bcrypt.compareSync(
          req.body.password,
          data.password
        );
        if (!passwordValid)
          return res.status(400).json({
            error: "ok",
            msg: "Incorrect user or password",
          });
        const jwtToken = jwt.sign(
          { user: { _id: data._id, name: data.name, email: data.email } },
          process.env.SEED,
          { expiresIn: process.env.EXPIRATION }
        );
        res.json({
          user: {
            _id: data._id,
            name: data.name,
            email: data.email,
          },
          jwt: jwtToken,
        });
      } else {
        res.status(400).json({
          error: "ok",
          msg: "Incorrect user or password",
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        error: "ok",
        msg: `Error in service ${error}`,
      });
    });
};
