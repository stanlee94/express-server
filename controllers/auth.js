const jwt = require("jwt-simple");
const config = require("../config");
const User = require("../models/user");

function getToken(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signIn = function(request, response, next) {
  response.send({
    token: getToken(request.user)
  });
};

exports.signUp = (request, response, next) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response.send({ error: "You must provide both email and password" });
  }

  if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    return response.send({
      error: "This don't looks like an email"
    });
  }

  User.findOne({ email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      response.status(422).send({
        error: "Email is in use"
      });
    }

    const user = new User({
      email,
      password
    });

    user.save(err => {
      if (err) {
        return next(err);
      }

      response.send({
        token: getToken(user)
      });
    });
  });
};
