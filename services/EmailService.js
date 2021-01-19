const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");
const { google } = require("googleapis");
require("dotenv").config();

const sendAccountVerificationEMail = async ({ email, token }) => {
  const url = `http://${process.env.HOST}:${process.env.FRONTEND_CLIENT_PORT}/verification?token=${token}`;

  // const oAuth2Client = new google.auth.OAuth2(
  //   process.env.CLIENT_ID,
  //   process.env.CLIENT_SECRET,
  //   process.env.REDIRECT_URI
  // );
  // oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  // try {
  //   const accessToken = await oAuth2Client.getAccessToken();

  //   const transport = nodemailer.createTransport({
  //     service: "gmail",
  //     auth: {
  //       type: "OAuth2",
  //       user: "thivankanimshan@gmail.com",
  //       clientId: process.env.CLIENT_ID,
  //       clientSecret: process.env.CLIENT_SECRET,
  //       refreshToken: process.env.REFRESH_TOKEN,
  //       accessToken: accessToken,
  //     },
  //   });

  //   const mailOptions = {
  //     from: "Thivanka Nimesh <no-reply@gmail.com>",
  //     to: `${email}`,
  //     subject: "Account Confirmation",
  //     html: `<p>Click Link to confirm your account <a href="${url}">Click Here</a></p>`,
  //   };

  //   const result = await transport.sendMail(mailOptions);
  //   return result;
  // } catch (err) {
  //   console.log(err);
  //   return err;
  // }

  try {
    const transport = nodemailer.createTransport(
      nodemailerSendgrid({
        apiKey: process.env.SENDGRID_API_KEY,
      })
    );

    transport.sendMail({
      from: "thivankanimshan@gmail.com",
      personalizations: [
        {
          to: [
            {
              email: email,
            },
          ],
          dynamic_template_data: {
            url: url,
          },
        },
      ],
      template_id: "d-c2a7198353254fcf89923410ebf3dfb1",
      to: email,
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};

const sendPasswordResetEmail = async ({ email, token }) => {
  const url = `http://${process.env.HOST}:${process.env.FRONTEND_CLIENT_PORT}/resetPassword?token=${token}`;

  // const oAuth2Client = new google.auth.OAuth2(
  //   process.env.CLIENT_ID,
  //   process.env.CLIENT_SECRET,
  //   process.env.REDIRECT_URI
  // );
  // oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  // try {
  //   const accessToken = await oAuth2Client.getAccessToken();

  //   const transport = nodemailer.createTransport({
  //     service: "gmail",
  //     auth: {
  //       type: "OAuth2",
  //       user: "thivankanimshan@gmail.com",
  //       clientId: process.env.CLIENT_ID,
  //       clientSecret: process.env.CLIENT_SECRET,
  //       refreshToken: process.env.REFRESH_TOKEN,
  //       accessToken: accessToken,
  //     },
  //   });

  //   const mailOptions = {
  //     from: "Thivanka Nimesh <no-reply@gmail.com>",
  //     to: `${email}`,
  //     subject: "Password Reset",
  //     html: `<p>Click Link to reset your password <a href="${url}">Click Here</a></p>`,
  //   };

  //   const result = await transport.sendMail(mailOptions);
  //   return result;
  // } catch (err) {
  //   return err;
  // }

  try {
    const transport = nodemailer.createTransport(
      nodemailerSendgrid({
        apiKey: process.env.SENDGRID_API_KEY,
      })
    );

    transport.sendMail({
      from: "thivankanimshan@gmail.com",
      personalizations: [
        {
          to: [
            {
              email: email,
            },
          ],
          dynamic_template_data: {
            url: url,
          },
        },
      ],
      template_id: "d-b533120c526b491a83f7581957eae33b",
      to: email,
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  sendAccountVerificationEMail,
  sendPasswordResetEmail,
};
