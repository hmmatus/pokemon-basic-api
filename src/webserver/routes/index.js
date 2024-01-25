const express = require("express");
const router = express.Router();

const auth = require("./auth");
const user = require("./user");

router.get("/", (req, res) => {
  res.send({
    message: "Welcome to the Pokemon Basic API",
  });
});

router
.post("/login", auth.login);

// user
router
.post("/user", user.signUp);

module.exports = router;