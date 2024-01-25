const express = require("express");
const router = express.Router();

const user = require("./user");

router.get("/", (req, res) => {
  res.send({
    message: "Welcome to the Pokemon Basic API",
  });
});

// user
router
.post("/user", user.signUp)
.post("/user/login", user.login)

module.exports = router;