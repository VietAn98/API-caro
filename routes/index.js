var express = require("express");
var router = express.Router();
var appModel = require("../model/app.model");
var passport = require("passport");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

/* GET home page. */
router.get("/", function(req, res, next) {
  appModel.all().then(item => {
    // res.render("index", );
    res.json({ message: "Connected successfully to SQL!" });
  });
});

router.post("/user/register", (req, res, next) => {
  var entity = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    date: req.body.date,
    gender: req.body.gender,
    avatar: req.body.avatar
  };
  appModel.add(entity).then(id => {
    res.json({ status: "200" });
  });
});

// Upload Image
router.post("/photo", upload.single("avatar"), (req, res, next) => {
  return res.json({
      avatar: req.file.path
  });
});

router.get("/me", passport.authenticate("jwt", { session: false }), function(
  req,
  res,
  next
) {
  res.json(req.user);
});

module.exports = router;
