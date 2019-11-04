const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const appModel = require("../model/app.model");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    function(username, password, cb) {
      //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
      return appModel
        .findOne(username)
        .then(rows => {
          if (!rows) {
            return cb(null, false, {
              message: "Incorrect username or password."
            });
          }
          if (password === rows[0].password) {
            var id = rows[0].id;
            var user = { id, username, password };
            return cb(null, user, { message: "Logged In Successfully" });
          }
          return cb(null, false, { message: "Invalid pass!!" });
        })
        .catch(err => cb(err));
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret"
    },
    function(jwtPayload, cb) {
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      return appModel.findOneById(jwtPayload.id)
        .then(user => {
          return cb(null, user);
        })
        .catch(err => {
          return cb(err);
        });
    }
  )
);
