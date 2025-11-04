import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const transEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

const sendEmail = async (to, subject, htmlContent) => {
  try {
    const sender = {
      email: process.env.BREVO_SENDER_EMAIL,
      name: "IRIS",
    };

    await transEmailApi.sendTransacEmail({
      sender,
      to: [{ email: to }],
      subject,
      htmlContent,
    });

    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error(
      "❌ Email send error:",
      error.response?.text || error.message
    );
  }
};

//
// 🌟 1. Verification Email
//
export const sendVerificationEmail = async (to, otp) => {
  const subject = "Verify Your Email - IRIS";
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Verification - IRIS</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f3f4f8;
      font-family: 'Poppins', 'Segoe UI', Tahoma, sans-serif;
    }
    .container {
      max-width: 620px;
      margin: 40px auto;
      background: #fff;
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 6px 20px rgba(0,0,0,0.08);
      border: 1px solid #e2e2e2;
    }
    .header {
      background: linear-gradient(135deg, #7b2ff7, #f107a3);
      color: #fff;
      padding: 35px 25px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 30px;
      font-weight: 700;
      letter-spacing: 1px;
    }
    .content {
      padding: 30px;
      text-align: center;
      color: #333;
    }
    .content h2 {
      font-size: 22px;
      margin-bottom: 12px;
      color: #7b2ff7;
    }
    .content p {
      font-size: 15px;
      line-height: 1.6;
      color: #555;
    }
    .otp-box {
      display: inline-block;
      margin: 20px 0;
      padding: 15px 40px;
      border-radius: 8px;
      background: #faf6ff;
      border: 2px dashed #7b2ff7;
      font-size: 26px;
      font-weight: 700;
      letter-spacing: 5px;
      color: #5a189a;
    }
    .note {
      font-size: 13px;
      color: #777;
      margin-top: 10px;
    }
    .footer {
      background: #f9f9fc;
      padding: 20px;
      text-align: center;
      font-size: 13px;
      color: #666;
      border-top: 1px solid #e2e2e2;
    }
    .footer a {
      color: #7b2ff7;
      text-decoration: none;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>IRIS</h1>
      <p>Empowering Digital Innovation</p>
    </div>

    <div class="content">
      <h2>Email Verification</h2>
      <p>Welcome to <strong>IRIS</strong>!<br>
      Please use the OTP below to verify your email address:</p>

      <div class="otp-box">{{OTP_CODE}}</div>

      <p class="note">This OTP will expire in <strong>10 minutes</strong>.<br>
      Do not share it with anyone.</p>
    </div>

    <div class="footer">
      <p>Need help? Contact us at <a href="mailto:support@iris.com">support@iris.com</a><br>
      © 2025 IRIS. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`.replace("{{OTP_CODE}}", otp);

  await sendEmail(to, subject, htmlContent);
};

//
// 🌟 2. Registration Success Email
//
export const sendRegistrationSuccessEmail = async (to, userName) => {
  const subject = "Welcome to IRIS 🎉 - Registration Successful";
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to IRIS</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f3f4f8;
      font-family: 'Poppins', 'Segoe UI', Tahoma, sans-serif;
    }
    .container {
      max-width: 620px;
      margin: 40px auto;
      background: #fff;
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 6px 20px rgba(0,0,0,0.08);
      border: 1px solid #e2e2e2;
    }
    .header {
      background: linear-gradient(135deg, #f107a3, #7b2ff7);
      color: #fff;
      text-align: center;
      padding: 35px 25px;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 1px;
    }
    .content {
      padding: 30px;
      text-align: center;
      color: #333;
    }
    .content h2 {
      font-size: 22px;
      color: #7b2ff7;
      margin-bottom: 10px;
    }
    .content p {
      font-size: 15px;
      color: #555;
      line-height: 1.6;
    }
    .highlight {
      background: #f7f1ff;
      border-left: 4px solid #7b2ff7;
      padding: 12px;
      margin: 20px 0;
      border-radius: 6px;
      color: #333;
      font-size: 14px;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #7b2ff7, #f107a3);
      color: #fff !important;
      text-decoration: none;
      padding: 12px 25px;
      border-radius: 8px;
      font-weight: 600;
      margin-top: 15px;
    }
    .footer {
      background: #f9f9fc;
      padding: 20px;
      text-align: center;
      font-size: 13px;
      color: #666;
      border-top: 1px solid #e2e2e2;
    }
    .footer a {
      color: #7b2ff7;
      text-decoration: none;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to IRIS 🎉</h1>
    </div>

    <div class="content">
      <h2>Hi ${userName || "there"}, your registration is successful!</h2>
      <p>We’re thrilled to welcome you to <strong>IRIS</strong> — your intelligent gateway to creativity, innovation, and digital transformation.</p>

      <div class="highlight">
        Explore smart solutions, connect with opportunities, and bring your ideas to life with IRIS.
      </div>

      <a href="https://iris-platform.vercel.app" class="button">Go to Dashboard</a>
    </div>

    <div class="footer">
      <p>Need help? Contact us at <a href="mailto:support@iris.com">support@iris.com</a><br>
      © 2025 IRIS. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;

  await sendEmail(to, subject, htmlContent);
};

//
// 🌟 3. Password Reset Email
//
export const sendPasswordResetEmail = async (to, otp) => {
  const subject = "Reset Your Password - IRIS";
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Password Reset - IRIS</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f3f4f8;
      font-family: 'Poppins', 'Segoe UI', Tahoma, sans-serif;
    }
    .container {
      max-width: 620px;
      margin: 40px auto;
      background: #fff;
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 6px 20px rgba(0,0,0,0.08);
      border: 1px solid #e2e2e2;
    }
    .header {
      background: linear-gradient(135deg, #ff416c, #ff4b2b);
      color: #fff;
      text-align: center;
      padding: 35px 25px;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 1px;
    }
    .content {
      padding: 30px;
      text-align: center;
      color: #333;
    }
    .content h2 {
      font-size: 22px;
      margin-bottom: 12px;
      color: #ff416c;
    }
    .content p {
      font-size: 15px;
      color: #555;
      line-height: 1.6;
    }
    .otp-box {
      display: inline-block;
      margin: 20px 0;
      padding: 15px 40px;
      border-radius: 8px;
      background: #fff5f7;
      border: 2px dashed #ff4b2b;
      font-size: 26px;
      font-weight: 700;
      letter-spacing: 5px;
      color: #b30038;
    }
    .note {
      font-size: 13px;
      color: #777;
      margin-top: 10px;
    }
    .footer {
      background: #f9f9fc;
      padding: 20px;
      text-align: center;
      font-size: 13px;
      color: #666;
      border-top: 1px solid #e2e2e2;
    }
    .footer a {
      color: #ff4b2b;
      text-decoration: none;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Password Reset Request</h1>
    </div>

    <div class="content">
      <h2>Forgot Your Password?</h2>
      <p>We’ve got you covered! Use the OTP below to reset your password for <strong>IRIS</strong>:</p>

      <div class="otp-box">{{OTP_CODE}}</div>

      <p class="note">This OTP will expire in <strong>10 minutes</strong>.<br>
      If you didn’t request this, you can safely ignore this email.</p>
    </div>

    <div class="footer">
      <p>Need help? Contact us at <a href="mailto:support@iris.com">support@iris.com</a><br>
      © 2025 IRIS. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`.replace("{{OTP_CODE}}", otp);

  await sendEmail(to, subject, htmlContent);
};
