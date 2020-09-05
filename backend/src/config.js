const path = require("path");

const Environment = process.env.NODE_ENV || "development";

if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv-safe");
  dotenv.config({
    path: path.join(__dirname, "../.env"),
    example: path.join(__dirname, "../.env.example"),
  });
}

const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error(`You must set the  ${name}  environment variable`);
  }
  return process.env[name];
};

const config = {
  all: {
    port: process.env.PORT || 9000,
    jwtSecret: requireProcessEnv("JWT_SECRET"),
    googleId: requireProcessEnv("GOOGLE_CLIENT_ID"),
    googleSecret: requireProcessEnv("GOOGLE_CLIENT_SECRET"),
    stripekey: requireProcessEnv("STRIPE_KEY"),
    stripeSecret: requireProcessEnv("STRPE_SECRET"),
    mongo: {
      uri: requireProcessEnv("DB_URI"),
      options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      },
    },
  },
  test: {},
  dev: {
    mongo: {
      uri: "mongodb://localhost/cform-dev",
      options: {
        debug: true,
      },
    },
  },
};

module.exports = { ...config.all, ...config[Environment] };
