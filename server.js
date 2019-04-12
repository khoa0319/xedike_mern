/* 3rd packages */
const express = require('express');
const mongoose = require('mongoose');
/* project packages */

/* Connect DB */
mongoose.connect('mongodb://localhost:27017/fs03-xedike', { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.log)
/* Initialize server */
const app = express();

/* middlewares */
// parser
app.use(express.urlencoded({extended: false}))
app.use(express.json())
// Router
app.use('/api/users', require('./routes/api/users'));
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server's listening on PORT: " + port);
});