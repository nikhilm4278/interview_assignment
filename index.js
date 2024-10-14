var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");

const {
  check,
  body,
  // ...
  validationResult,
} = require("express-validator");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/validate", [
  // Validate and sanitize the 'username' field
  body('username').isLength({ min: 5 }).trim().escape(),

  // Validate and sanitize the 'email' field
  body('email').isEmail().normalizeEmail(),

  // Validate the 'password' field
  body('password').isLength({ min: 6 }),
], function (req, res) {
   const errors = validationResult(req);

  // If there are validation errors, respond with a 400 Bad Request status
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // If validation is successful, handle the registration logic here
  const { username, email, password } = req.body;
  // ... Your registration logic ...

  // Respond with a success message or redirect as needed
  res.status(200).json({ message: 'Registration successful' });
 
});





// // Define an API route for user registration
// app.get('/validate', (req, res) => {
//   // Perform the validation by checking for errors
//    res.end(JSON.stringify("Registration successful"));
//   //res.end(200).json({ message: 'Registration successful' });
// });


var server = app.listen(5000, function () {
  console.log("Express App running at http://127.0.0.1:5000/");
});
