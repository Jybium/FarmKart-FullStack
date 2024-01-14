
import prisma from "../../../lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(
  req,
  res
) {
  const { refreshToken } = req.body;

  try {
    if (!refreshToken) {
      return res
        .status(400)
        .json({ message: "Bad request: Refresh token is required" });
    }

    // Verify the refresh token and retrieve the associated user
    const decoded = jwt.verify(refreshToken, "your-refresh-token-secret-key");
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user || user.refreshToken !== refreshToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid refresh token" });
    }

    // Generate a new access token and refresh token
    const newAccessToken = generateAccessToken({
      userId: user.id,
      username: user.username,
    });
    const newRefreshToken = generateRefreshToken({ userId: user.id });

    // Update the user's refresh token in the database
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized: Invalid refresh token" });
  }
}

function generateAccessToken(payload) {
  // Implement a secure method to generate access tokens
  // For simplicity, you can use a library like jsonwebtoken
  // Set a short expiration time for access tokens (e.g., 15 minutes)
  return jwt.sign(payload, "your-access-token-secret-key", {
    expiresIn: "15m",
  });
}

function generateRefreshToken(payload) {
  // Implement a secure method to generate refresh tokens
  // For simplicity, you can use a library like jsonwebtoken
  // Set a longer expiration time for refresh tokens (e.g., 30 days)
  return jwt.sign(payload, "your-refresh-token-secret-key", {
    expiresIn: "30d",
  });
}
