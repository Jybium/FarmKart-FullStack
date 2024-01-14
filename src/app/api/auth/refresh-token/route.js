//@ts-ignore

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;

mongoose.connect("mongodb://localhost:27017/your-database-name", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  refreshToken: String,
});

const User = mongoose.model("User", userSchema);

app.use(express.json());

// Middleware to validate JWT token before processing requests
const tokenValidationMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "your-access-token-secret-key");
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

app.use(tokenValidationMiddleware);

// Refresh token route
app.post("/refresh-token", async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res
      .status(400)
      .json({ message: "Bad request: Refresh token is required" });
  }

  try {
    // Validate the refresh token and retrieve the associated user
    const decoded = jwt.verify(refreshToken, "your-refresh-token-secret-key");
    const user = await User.findOne({ _id: decoded.userId, refreshToken });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid refresh token" });
    }

    // Generate a new access token
    const accessToken = jwt.sign(
      { userId: user._id, username: user.username },
      "your-access-token-secret-key",
      { expiresIn: "15m" }
    );

    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized: Invalid refresh token" });
  }
});

// Protected route
app.get("/protected", (req, res) => {
  res.json({
    message: "Protected route accessed successfully",
    user: req.user,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


async function generateRefreshToken() {
  const user = await User.findOne({ username: 'test' }); // Replace with your actual username

  if (user) {
    const refreshToken = jwt.sign({ userId: user._id }, 'your-refresh-token-secret-key', { expiresIn: '30d' });

    user.refreshToken = refreshToken;
    await user.save();

    console.log('Refresh token generated successfully:', refreshToken);
  } else {
    console.log('User not found');
  }

}
