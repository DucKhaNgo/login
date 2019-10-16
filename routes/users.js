var express = require('express');
var router = express.Router();
var userModel = require('../model/user.model');
const jwt = require('jsonwebtoken');
const passport = require('passport');
/* POST login. */
router.post('/login', function (req, res, next) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user: user
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user, 'your_jwt_secret');
      return res.json({ user, token });
    });
  })(req, res);
});
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/register', async (req, res, next) => {
  console.log('reqbody--------', req.body);
  const useravai = await userModel.singleByEmail(req.body.email);
  console.log('useravai----', useravai);
  if (useravai.leng > 0) {
    res.send('email has already exist');
    return;
  };
  await userModel.add({email: req.body.email, password: req.body.password});
  res.send('register ok');
});
module.exports = router;
