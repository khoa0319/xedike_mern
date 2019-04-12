/* 3rd packages */
const express = require('express');

/* project packages */

/* Initialize server */
const app = express();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server's listening on PORT: " + port);
  console.log('Connected to DB');
})