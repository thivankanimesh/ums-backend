const {
  userRegister,
  userLogin,
  refreshAccessToken,
  confirmation,
  sendPasswordResetEmail,
  validatePasswordResetToken,
  setNewPasswordHeaders,
  setNewPassword,
} = require("./UserSchema");

const registerUserValidation = async (req, res, next) => {
  const result = await userRegister.validate(req.body);
  if (result.error) {
    res.status(400).json({
      success: false,
      error: result.error.details[0].message,
    });
  } else {
    next();
  }
};

const loginUserValidation = async (req, res, next) => {
  const result = await userLogin.validate(req.body);
  if (result.error) {
    res.status(400).json({
      success: false,
      error: result.error.details[0].message,
    });
  } else {
    next();
  }
};

const refreshAccessTokenValidation = async (req, res, next) => {
  const result = await refreshAccessToken.validate(req.body);
  if (result.error) {
    res.status(400).json({
      success: false,
      error: result.error.details[0].message,
    });
  } else {
    next();
  }
};

const confirmationValidation = async (req, res, next) => {
  const result = await confirmation.validate(req.body);
  if (result.error) {
    res.status(400).json({
      success: false,
      error: result.error.details[0].message,
    });
  } else {
    next();
  }
};

const sendPasswordResetEmailValidation = async (req, res, next) => {
  const result = await sendPasswordResetEmail.validate(req.body);
  if (result.error) {
    res.status(400).json({
      success: false,
      error: result.error.details[0].message,
    });
  } else {
    next();
  }
};

const validatePasswordResetTokenValidation = async (req, res, next) => {
  const result = await validatePasswordResetToken.validate(req.body);
  if (result.error) {
    res.status(400).json({
      success: false,
      error: result.error.details[0].message,
    });
  } else {
    next();
  }
};

const setNewPasswordHeadersValidate = async (req, res, next) => {
  const result = await setNewPasswordHeaders.validate(req.headers);
  if (result.error) {
    res.status(401).json({
      success: false,
      error: result.error.details[0].message,
    });
  } else {
    next();
  }
};

const setNewPasswordValidate = async (req, res, next) => {
  const result = await setNewPassword.validate(req.body);
  if (result.error) {
    res.status(400).json({
      success: false,
      error: result.error.details[0].message,
    });
  } else {
    next();
  }
};

module.exports = {
  registerUserValidation,
  loginUserValidation,
  refreshAccessTokenValidation,
  confirmationValidation,
  sendPasswordResetEmailValidation,
  validatePasswordResetTokenValidation,
  setNewPasswordHeadersValidate,
  setNewPasswordValidate,
};
