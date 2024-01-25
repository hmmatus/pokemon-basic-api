let books = (module.exports = {});

books.login = (req, res) => {
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
}