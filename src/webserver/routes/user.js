const {checkIfUserExists, createUser} = require("../../middlewares/user");
const  { userSchema } = require("../../schema/user");
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
}