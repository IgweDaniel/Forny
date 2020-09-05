const passport = require("passport");
const { User } = require("../../api/users/model");
const { jwtSecret } = require("../../config");

const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

passport.use(
  "token",
  new JwtStrategy(
    {
      secretOrKey: jwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    ({ id }, done) => {
      User.findById(id)
        .populate("plan")
        .then((user) => done(null, user))
        .catch(done);
    }
  )
);

const token = (req, res, next) =>
  passport.authenticate("token", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({ error: true, message: "UnAuthorized" });
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) return res.status(401).end();
      next();
    });
  })(req, res, next);

const google = (req, res, next) => {};
module.exports = {
  token,
  google,
};
