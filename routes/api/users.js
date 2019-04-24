/* 3rd party modules */
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
/* app modules */
const { User } = require('../../models/users');
const { authUser } = require('../../middleware/authorizeUser');
const validateRegisterInput = require('../../validation/validateRegisterInput');

const storage = multer.diskStorage({
  destination:(req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    let type = "";
    if (file.mimetype === "application/octet-stream") type = ".jpg"
    cb(null, new Date().getTime() + '-' + file.originalname + type);
  }
})
const upload = multer({storage})

/* Un-Auth */
router.get('/', (req, res) => {
  User.find()
  .then(users => res.status(200).json(users))
  .catch(err => res.status(404).json(err))
})

router.get('/:id', (req, res) => {
  let id = req.params['id'];  
  User.findOne({_id:id})
  .then(users => res.status(200).json(users))
  .catch(err => res.status(404).json(err))
})

router.post('/register', (req, res) => {
  let { email, password, fullname, phone, dateOfBirth, userType } = req.body;
  const {errors, isValid} = validateRegisterInput(req.body);  
  if (!isValid) return res.status(404).json(errors);

  User.findOne({$or: [{email}, {phone}]})
    .then( user => {
      // user exists
      if (user) {
        if (user.email === email) errors.email = "email exists";
        if (user.phone === phone) errors.phone = "phone exists";
        return res.status(400).json(errors)
      }

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
            "khoahuynh",
            {expiresIn: '1h'},
            (err, token) => {
              res.status(200).json({ msg: "login success", token: 'bearer ' + token});
            }
          )
        })
    })
});

/* Auth */
/* User Actions */
router.post('/update',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const { id, fullname, password } = req.body;
    User.findOne({ _id: id})
      .then(user => {        
        if (!user) return res.status(404).json({err: "Not found"});
        user.password = password;
        user.fullName = fullname;
        return user.save()
      })
      .then(result => res.status(200).json(result))
      .catch(err => res.status(200).json(err))
  }
);

router.post('/delete',
  passport.authenticate("jwt",{session: false}),
  (req, res) => {
    User.findByIdAndRemove(req.body.id)
    .then(result => res.status(200).json({msg: "delete successfully"}))
    .catch(err => res.status(400).json(err))
  }
)

router.post('/upload-avatar',
  passport.authenticate('jwt', {session: false}),
  upload.single('avatar'),
  (req, res) => {
    console.log(req.file);
    User
      .findById(req.user.id)
      .then(user => {
        user.avatar = req.file.path
        return user.save();
      })
      .then(user => res.status(200).json(user))
      .catch(err => res.status(400).json(err))
  }  
)

/* Driver actions */

router.post('/drivers/update-profile',
  passport.authenticate('jwt', {session: false}),
  authUser('driver'),
  (req, res) => {
    const { id, address, mainJob } = req.body;
    User.findOne({ _id: id})
      .then(user => {        
        if (!user) return res.status(404).json({err: "Not found"});
        user.address = password;
        user.fullName = fullname;
        return user.save()
      })
      .then(result => res.status(200).json(result))
      .catch(err => res.status(200).json(err))
    // validate address & mainjob
  }
)

// test current
router.get('/test-private', 
passport.authenticate('jwt', {session: false}), 
  authUser('driver'),
  (req, res) => {
    res.json({msg: "success"});
});

module.exports = router;