import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

import User from "../models/User.model.js";
import RefreshToken from "../models/RefreshToken.model.js";
import { resetPasswordEmail } from "../utils/mailTemplates.js";
import { sendMail } from "../config/Mail.config.js";

export const registerService = async ({ display_name, email, password }) => {
  const isEmailExists = await User.findOne({ email });

  if (isEmailExists) {
    throw { status: 400, message: "Email already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  console.log(hashedPassword);

  const user = await User.create({
    display_name,
    email,
    password: hashedPassword,
  });

  // remove password before returning
  //user.password = undefined;

  return user;
};

export const loginService = async ({ email, password, rememberMe }) => {
  if (!email || !password) {
    throw { status: 400, message: "Email or password is required" };
  }

  const user = await User.findOne({ email });
  console.log(user);
  if (!user) throw { status: 400, message: "Invalid email or password" };

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw { status: 400, message: "Invalid email or password" };

  // Create JWTS

  const refreshTokenExpiry = rememberMe
    ? ["30d", 30 * 24 * 60 * 60 * 1000]
    : ["1d", 24 * 60 * 60 * 1000];

  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" },
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: refreshTokenExpiry[0] },
  );

  // Store refresh token in DB
  await RefreshToken.findOneAndUpdate(
    { userId: user._id },
    { token: refreshToken },
    { upsert: true, new: true },
  );

  // Emit password from user object to return to frontend
  // Option 1: Using destructuring
  // const {password: _, ...returnUser} = user;

  //Option 2: Set password in user object to undefined to omit it
  user.password = undefined;

  return {
    user,
    accessToken,
    refreshToken,
    refreshTokenMaxAge: refreshTokenExpiry[1],
  };
};

export const logoutService = async (userId) => {
  await RefreshToken.deleteOne({ userId });
};

export const  forgotPasswordService = async (email, baseURL) => {
  if (!email) {
    throw { status: 400, message: "Email is required" };
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw { status: 404, message: "Could not find user with given email" };
  }

  // Create reset token and save to db
  const resetToken = user.createResetPasswordToken();


  console.log(resetToken);
  await user.save({validateBeforeSave: false}); //skip fields constraint check

  // Send mail with token to user (check in mailtrap sandbox plz)
  const resetURL = baseURL + `/api/v1/users/resetPassword/${resetToken}`;
  console.log(resetURL);
  await sendMail({
    subject: "Reset your password",
    html: resetPasswordEmail(resetURL),
  });
};

export const refreshAccessTokenService = async (token) => {
  if (!token) {
    throw { status: 401, message: "Refresh token missing" };
  }

  // Verify signature
  const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

  // Check if token exists in DB
  const storedToken = await RefreshToken.findOne({
    userId: decoded.userId,
    token: token,
  });

  if (!storedToken) {
    throw { status: 403, message: "Refresh token not recognized" };
  }

  // Create new access token
  const accessToken = jwt.sign(
    { userId: decoded.userId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" },
  );

  return accessToken;
};
