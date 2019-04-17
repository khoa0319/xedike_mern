const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const passport = require('passport');
const { User } = require('../../models/users');
const { authUser } = require('../../middleware/authorizeUser');
router.get('/', (req, res) => {
  res.status(200).json({
    message: "hello world"
  });
  res.end();
})

router.post('/register', (req, res) => {
  const { email, password, fullname, phone, dateOfBirth, userType } = req.body;

  User.findOne({$or: [{email}, {phone}]})
    .then( user => {
      // user exists
      if (user) return res.status(400).json({errors: 'email or phone exists'})

      // user not exists
      const newUser = new User({
        email, password, fullname, phone, dateOfBirth, userType
      });
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return res.status(400).json(err);
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) return res.status(400).json(err);
          newUser.password = hash;
          newUser.save()
            .then(user => {
              res.status(200).json(user);
            })
            .catch(err => res.status(400).json(err))
        })
      })
    })
    .catch(console.log)
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  User
    .findOne({email})
    .then(user => {
      if (!user) return res.status(404).json({email: "Email does not exists"});
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) return res.status(400).json({password: "Password incorrect"});
          // thong tin tra ve
          const payload = {
            id: user._id,
            email: user.email,
            fullname: user.fullname,
            userType: user.userType
          }
          jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {expiresIn: '1h'},
            (err, token) => {
              res.status(200).json({ msg: "login success", token: 'bearer ' + token});
            }
          )
        })
    })
});

// test current
router.get('/test-private', 
passport.authenticate('jwt', {session: false}), 
  authUser('driver'),
  (req, res) => {
    res.json({msg: "success"});
});

module.exports = router;