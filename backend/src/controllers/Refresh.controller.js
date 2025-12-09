import jwt from "jsonwebtoken";
import "dotenv/config";

export const getRefreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;

  console.log(token);

  if (!token) return res.status(401).json({ message: "Refresh token missing" });

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const accessToken = jwt.sign(
      { user_id: decoded.user_id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    return res.json({ accessToken });
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token" });
  }
};
