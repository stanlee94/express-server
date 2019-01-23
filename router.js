const Authentication = require("./controllers/auth");
const passportService = require("./services/passport");
const passport = require("passport");

const requireAuthentication = passport.authenticate("jwt", { session: false });
const requireSignIn = passport.authenticate("local", { session: false });

module.exports = app => {
  app.get("/", requireAuthentication, (request, response) => {
    response.send({ Hello: "You are authorized" });
  });
  app.post("/signin", requireSignIn, Authentication.signIn);
  app.post("/signup", Authentication.signUp);
};
