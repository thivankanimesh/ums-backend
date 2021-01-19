const joi = require("@hapi/joi");

const schema = {
  userRegister: joi.object({
    firstName: joi.string().min(3).max(100).required(),
    lastName: joi.string().min(3).max(100).required(),
    dob: joi.date().required(),
    gender: joi.string().valid("male", "female").required(),
    email: joi.string().email().required(),
    password: joi
      .string()
      .regex(
        RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
      )
      .required()
      .messages({ "string.pattern.base": "password pattern not matched" }),
  }),
  userLogin: joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  }),
  refreshAccessToken: joi.object({
    refreshToken: joi.string().required(),
  }),
  confirmation: joi.object({
    token: joi.string().required(),
  }),
  sendPasswordResetEmail: joi.object({
    email: joi.string().email().required(),
  }),
  validatePasswordResetToken: joi.object({
    token: joi.string().required(),
  }),
  setNewPasswordHeaders: joi
    .object({
      authorization: joi.string().required(),
    })
    .unknown(true),
  setNewPassword: joi.object({
    password: joi
      .string()
      .regex(
        RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
      )
      .required()
      .messages({ "string.pattern.base": "password pattern not matched" }),
  }),
};

module.exports = schema;
