const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const appModel = require('../model/app.model');
 

/* POST login. */
router.post("/login", function(req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user
      });
    }
    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user, "your_jwt_secret");
      return res.json({
        user,
        token
      });
    });
  })(req, res);
});

router.post("/edit", function(req, res, next) {
  var entity = {
    id: req.body.id,
    username: req.body.username,
    password: req.body.password,
    date: req.body.date,
    gender: req.body.gender,
    avatar: req.body.avatar,
  };
  appModel.update(entity)
  .then(() =>{
    res.json({"status":'200'})
    console.log('Update successful!');
  })
  .catch((err) =>{
    console.log(err);
    res.end('Error occured!');
  });
});

module.exports = router;
