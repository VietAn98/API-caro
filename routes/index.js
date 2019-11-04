var express = require("express");
var router = express.Router();
var appModel = require("../model/app.model");

/* GET home page. */
router.get("/", function(req, res, next) {
  appModel.all().then(item => {
    // res.render("index", );
    res.json({message: 'Connected successfully to SQL!' });
  });
});

router.post('/user/register', (req, res, next) => {
  var entity = {
      username: req.body.username,
      password: req.body.password
  }
  appModel.add(entity).then(id => {
    res.json({status: "200"})
  })
})

module.exports = router;
