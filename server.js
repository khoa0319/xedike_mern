//require('dotenv').config();
/* 3rd packages */
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
/* project packages */

/* Connect DB */
mongoose.connect("mongodb+srv://root:khoa0319@cluster0-qnwsn.mongodb.net/test?retryWrites=true", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.log)
/* Initialize server */
const app = express();
/* middlewares */
app.use('/uploads', express.static('uploads'));
app.use(passport.initialize());
require('./config/passport')(passport);
// parser
app.use(express.urlencoded({extended: false}))
app.use(express.json())
// Router
app.use('/api/users', require('./routes/api/users'));
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server's listening on PORT: " + port);
});