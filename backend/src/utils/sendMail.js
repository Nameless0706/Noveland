import { transporter } from "../config/NodeMailer.config.js";
import { verifyEmail } from "../templates/mailTemplates.js";
export const sendWelcomeEmail = async (to, username) => {
  const info = await transporter.sendMail({
    from: `"${process.env.APP_NAME}" <${process.env.GMAIL_USER}>`,
    to,
    subject: `Welcome to ${process.env.APP_NAME}`,
    html: verifyEmail,
  });

  console.log("Welcome email sent:", info.messageId);
};

export const sendResetPasswordEmail = async (to, resetToken) => {
  const resetLink = `${process.env.APP_URL}/reset-password?token=${resetToken}`;

  const info = await transporter.sendMail({
    from: `"${process.env.APP_NAME}" <${process.env.GMAIL_USER}>`,
    to,
    subject: "Reset your password",
    text: `Reset your password: ${resetLink}`,
    html: `
      <h2>Password Reset</h2>
      <p>You requested a password reset.</p>
      <p>
        Click the button below to reset your password:
      </p>
      <p>
        <a 
          href="${resetLink}"
          style="
            padding:10px 16px;
            background:#4f46e5;
            color:#fff;
            text-decoration:none;
            border-radius:6px;
          "
        >
          Reset Password
        </a>
      </p>
      <p>This link will expire in 15 minutes.</p>
      <p>If you didn’t request this, ignore this email.</p>
    `,
  });

  console.log("Reset password email sent:", info.messageId);
};
