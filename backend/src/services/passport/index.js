const passport = require("passport");
const { User } = require("../../api/users/model");
const { jwtSecret } = require("../../config");
const { BasicStrategy } = require("passport-http");

const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

passport.use(
  "password",
  new BasicStrategy(async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        done(true);
        return null;
      }

      const passwordValid = await user.authenticate(password);

      if (passwordValid) {
        done(null, user);
        return null;
      }
      done(true);
    } catch (error) {
      done(error);
    }
  })
);

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
      return res.status(401).json({ error: true, message: "Token Error" });
    }
    req.logIn(user, { session: false }, (err) => {
      if (err)
        return res.status(401).json({ error: true, message: "Token Error" });
      next();
    });
  })(req, res, next);

const password = (req, res, next) =>
  passport.authenticate("password", { session: false }, (err, user) => {
    if (!user || err) {
      return res
        .status(401)
        .json({ error: true, message: "Wrong credentials" });
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) return res.status(401).end();
      next();
    });
  })(req, res, next);

module.exports = {
  token,
  password,
};
