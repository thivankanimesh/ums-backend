const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userService = require("../services/UserService");
const {
  registerUserValidation,
  loginUserValidation,
  refreshAccessTokenValidation,
  confirmationValidation,
  sendPasswordResetEmailValidation,
  validatePasswordResetTokenValidation,
  setNewPasswordHeadersValidate,
  setNewPasswordValidate,
} = require("../validation/user/UserValidation");

const router = express.Router();

router.use(express.json());

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization === undefined) {
    return res.status(400).json({
      success: false,
      error: "access token not provided",
    });
  }
  const token = authorization.split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    req.user = user;
    next();
  } catch (err) {
    if (err.message === "jwt expired") {
      return res.status(401).json({
        success: false,
        error: "access token expired",
      });
    } else {
      return res.status(403).json({
        success: false,
        error: "user not authenticated",
      });
    }
  }
};

router.post("/authenticate", (req, res) => {
  const { accessToken } = req.body;
  console.log(accessToken);

  try {
    const result = userService.authenticate({ accessToken });
    const { success } = result;

    if (success) {
      return res.status(200).json({
        success: true,
        message: "user authenticated",
      });
    } else {
      const { error } = result;

      if (error === "access token expired") {
        return res.status(401).json({
          success: false,
          error: error,
        });
      } else {
        return res.status(500).json({
          success: false,
          error: error,
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "server side error",
    });
  }
});

router.post("/refreshAccessToken", refreshAccessTokenValidation, (req, res) => {
  const { refreshToken } = req.body;

  try {
    const result = userService.refreshAccessToken({ refreshToken });

    const { success } = result;

    if (success) {
      const { accessToken } = result;
      return res.status(201).json({
        success: true,
        accessToken,
      });
    } else {
      const { error } = result;

      if (error === "invalid signature") {
        return res.status(401).json({
          success: false,
          error: error,
        });
      } else if (error === "jwt expired") {
        return res.status(401).json({
          success: false,
          error: error,
        });
      } else if (error === "invalid refresh token") {
        return res.status(401).json({
          success: false,
          error: error,
        });
      } else {
        return res.status(500).json({
          success: false,
          error: error,
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "server side error",
    });
  }
});

router.post("/register", registerUserValidation, async (req, res) => {
  const { firstName, lastName, dob, gender, password, email } = req.body;

  try {
    const result = await userService.register({
      firstName,
      lastName,
      dob,
      gender,
      password,
      email,
    });

    const { success } = result;

    if (success) {
      const { message } = result;

      return res.status(201).json({
        success: true,
        message: message,
      });
    } else {
      const { error } = result;

      if (error === "email already exists") {
        return res.status(409).json({
          success: false,
          error: error,
        });
      } else {
        return res.status(500).json({
          success: false,
          error: error,
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "server side error",
    });
  }
});

router.post("/confirmation", confirmationValidation, async (req, res) => {
  const { token } = req.body;

  if (token === undefined) {
    return res.status(400).json({
      success: false,
      error: "token not found",
    });
  }

  try {
    const result = await userService.confirmation(token);
    const { success } = result;

    if (success) {
      const { accessToken, refreshToken } = result;

      return res.status(201).json({
        success: true,
        accessToken,
        refreshToken,
      });
    } else {
      const { error } = message;

      return res.status(500).json({
        success: false,
        error: error,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "server side error",
    });
  }
});

router.post("/login", loginUserValidation, async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await userService.login({ email, password });
    const { success } = result;

    if (success) {
      const { accessToken, refreshToken } = result;

      return res.status(200).json({
        success: true,
        accessToken,
        refreshToken,
      });
    } else {
      const { error } = result;

      if (error === "email not verified") {
        return res.status(401).json({
          success: false,
          error: error,
        });
      } else if (error === "wrong credentials") {
        return res.status(401).json({
          success: false,
          error: error,
        });
      } else {
        return res.status(500).json({
          success: false,
          error: error,
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "server side error",
    });
  }
});

router.post(
  "/sendPasswordResetEmail",
  sendPasswordResetEmailValidation,
  async (req, res) => {
    const { email } = req.body;

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        error: "request body is not found",
      });
    }

    if (Object.keys(req.body).length !== 1) {
      return res.status(400).json({
        success: false,
        error: "request body is incomplete",
      });
    }

    try {
      const result = await userService.sendPasswordResetEmail(email);
      const { success } = result;

      if (success) {
        const { message } = result;
        return res.status(200).json({
          success: true,
          message: message,
        });
      } else {
        const { error } = result;

        if (error === "email not found") {
          return res.status(400).json({
            success: false,
            error: error,
          });
        } else {
          return res.status(500).json({
            success: false,
            error: error,
          });
        }
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: "server side error",
      });
    }
  }
);

router.post(
  "/validatePasswordResetToken",
  validatePasswordResetTokenValidation,
  (req, res) => {
    const { token } = req.body;

    try {
      const result = userService.validatePasswordResetToken(token);
      const { success } = result;

      if (success) {
        const { accessToken, refreshToken } = result;

        return res.status(200).json({
          success: true,
          accessToken,
          refreshToken,
        });
      } else {
        const { error } = result;

        if (error === "invalid token") {
          return res.status(401).json({
            success: false,
            error: error,
          });
        } else {
          return res.status(500).json({
            success: false,
            error: error,
          });
        }
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: "server side error",
      });
    }
  }
);

router.post(
  "/setNewPassword",
  setNewPasswordHeadersValidate,
  setNewPasswordValidate,
  async (req, res) => {
    const { password } = req.body;
    const { authorization } = req.headers;

    const token = authorization.split(" ")[1];

    try {
      const result = await userService.setNewPassword({ token, password });
      const { success } = result;

      if (success) {
        const { message } = result;

        return res.status(201).json({
          success: true,
          message: message,
        });
      } else {
        const { error } = result;

        if (error === "invalid token") {
          return res.status(400).json({
            success: false,
            error: error,
          });
        } else {
          return res.status(500).json({
            success: false,
            error: error,
          });
        }
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: "server side error",
      });
    }
  }
);

router.get("/home", auth, (req, res) => {
  res.json({
    success: true,
  });
});

module.exports = router;
