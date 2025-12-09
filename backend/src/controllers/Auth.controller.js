import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { sendSuccess, sendError } from "../utils/response.js"

import User from "../models/User.model.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const isUsernameExists = await User.findOne({ username });
  const isEmailExists = await User.findOne({ email });

  if (isUsernameExists) {
    sendError(res, 400, "Username has been taken");
  } else if (isEmailExists) {
    sendError(res, 400, "There's already a user with that email");
  }

  console.log(salt);
  console.log(hashedPassword);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  sendSuccess(res, 201, "Register Succesfully", user);
};

export const login = async (req, res) => {
  const { email, password, rememberMe } = req.body;

  if (!email || !password)
    sendError(res, 400, "Username or password is required");

  try {
    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      sendError(res, 400, "Username not found");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      sendError(res, 400, "Invalid username or passwordI");
    }

    // Create JWTS

    const refreshTokenExpiry = rememberMe
      ? ["30d", 30 * 24 * 60 * 60 * 1000]
      : ["1d", 24 * 60 * 60 * 1000];

    const accessToken = jwt.sign(
      { username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { username: user.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: refreshTokenExpiry[0] }
    );

    // Emit password from user object to return to frontend
    // Option 1: Using destructuring
    // const {password: _, ...returnUser} = user;

    //Option 2: Set password in user object to undefined to omit it
    user.password = undefined;

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      //secure: true, // if HTTPS
      //sameSite: 'Strict',
      maxAge: 15 * 60 * 1000, // 15 min
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // not accessible through JS
      //secure: true, // if HTTPS
      //sameSite: 'Strict',
      maxAge: refreshTokenExpiry[1], // 1 day
    });

    sendSuccess(res, 200, "Login sendSuccessful", {
      userData: user,
      accessToken,
    });
  } catch (error) {
    console.error(error);
    sendError(res, 500, "Server error");
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  return res.status(200).json({ message: "Logged out" });
};

