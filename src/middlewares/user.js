const User = require("../db/models/user.model");
const bcrypt = require("bcrypt");
async function checkIfUserExists(body) {
  try {
    const checkUser = await User.findOne({ email: body.email });
    return {
      status: checkUser,
    };
  } catch (error) {
    return {
      status: true,
      error: "Server error",
    };
  }
}
async function createUser(body) {
  let user = new User({
    email: body.email,
    name: body.name,
    password: bcrypt.hashSync(body.password, 10),
  });
  return await user.save();
}

module.exports = {
  checkIfUserExists,
  createUser
}