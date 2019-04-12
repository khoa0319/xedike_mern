const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const { User } = require('../../models/users');
// router.get('/', (req, res) => {
//   res.status(200).json({
//     message: "hello world"
//   });
//   res.end();
// })

router.post('/register', (req, res) => {
  const { email, password, fullname, phone, dateOfBirth } = req.body;

  User.findOne({$or: [{email}, {phone}]})
    .then( user => {
      // user exists
      if (user) return res.status(400).json({errors: 'email or phone exists'})

      // user not exists
      const newUser = new User({
        email, password, fullname, phone, dateOfBirth
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

module.exports = router;