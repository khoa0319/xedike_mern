const _ = require('lodash');
const validator = require('validator');

const validateRegisterInput = (data) => {
  let errors = {};

  if (!email) email = "";
  if (!passsword) passsword = "";
  if (!passsword2) passsword2 = "";
  if (!fullname) fullname = "";
  
  const {email, passsword, password2, fullname, phone, dateOfBirth} = data;
  if (!validator.isEmail(email)) errors.email = "Email is invalid";
  if (validator.isEmpty(email)) errors.email = "Email is required";

  //validate password
  if (validator.isLength(passsword, {min: 8})) errors.passsword = "passsword must be atleast 8 characters";
  if (!validator.equals(passsword, password2)) errors.passsword2 = "password must match";
  return {
    errors,
    isValid: _.isEmpty(errors)
  }
}
module.exports = validateRegisterInput;