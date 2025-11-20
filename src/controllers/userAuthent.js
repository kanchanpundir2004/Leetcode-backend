// const User = require("../models/user");
// const validate = require("../utils/validator");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // ✅ REGISTER
// const register = async (req, res) => {
//   try {
//     const data = req.body;

//     const validationResult = validate(data);
//     if (!validationResult.status) {
//       return res.status(400).json({ message: validationResult.message });
//     }

//     const { firstName, emailId, password } = data;

//     const existingUser = await User.findOne({ emailId });
//     if (existingUser) {
//       return res.status(409).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       firstName,
//       emailId,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     res.status(201).json({
//       message: "User registered successfully",
//       user: {
//         firstName: newUser.firstName,
//         emailId: newUser.emailId,
//       },
//     });
//   } catch (error) {
//     console.error("Registration error:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // ✅ LOGIN
// const login = async (req, res) => {
//   try {
//     const { emailId, password } = req.body;

//     if (!emailId || !password) {
//       return res.status(400).json({ message: "Email and password required" });
//     }

//     const user = await User.findOne({ emailId });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // ✅ Generate JWT Token
//     const token = jwt.sign(
//       { id: user._id, emailId: user.emailId },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     // ✅ Store token in secure cookie
//     res.cookie("token", token, {
//       httpOnly: true,
//       maxAge: 24 * 60 * 60 * 1000, // 1 day
//       secure: process.env.NODE_ENV === "production",
//     });

//     res.status(200).json({
//       message: "Login successful",
//       token,
//       user: {
//         firstName: user.firstName,
//         emailId: user.emailId,
//       },
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // ✅ RESET PASSWORD
// const resetPassword = async (req, res) => {
//   try {
//     const { emailId, newPassword } = req.body;

//     const user = await User.findOne({ emailId });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.password = await bcrypt.hash(newPassword, 10);
//     await user.save();

//     res.status(200).json({ message: "Password reset successful" });
//   } catch (error) {
//     console.error("Reset password error:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // ✅ LOGOUT
// const logout = async (req, res) => {
//   try {
//     // Clear the JWT token cookie
//     res.clearCookie("token", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//     });

//     res.status(200).json({ message: "Logout successful" });
//   } catch (error) {
//     console.error("Logout error:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // ✅ GET PROFILE
// const getProfile = async (req, res) => {
//   try {
//     const { emailId } = req.body;
//     const user = await User.findOne({ emailId }).select("-password");

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({ message: "Profile fetched successfully", user });
//   } catch (error) {
//     console.error("Get profile error:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// module.exports = { register, login, resetPassword,logout, getProfile };

const redisClient = require("../config/redis");
const User = require("../models/user");
const validate = require("../utils/validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    validate(req.body);
    const { password } = req.body;

    // Always normal users register here
    req.body.role = "user";
    req.body.password = await bcrypt.hash(password, 10);

    const user = await User.create(req.body);

    const token = jwt.sign(
      { _id: user._id, emailId: user.emailId, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    );

    // ✅ Correct Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      user: {
        firstName: user.firstName,
        emailId: user.emailId,
        role: user.role,
      },
      message: "Registered & Logged in Successfully ✅",
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

const login = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    console.log("BODY:", req.body);

    if (!emailId || !password) throw new Error("Invalid Credentials");

    const user = await User.findOne({ emailId });
    if (!user) throw new Error("Invalid Credentials");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid Credentials");

    const token = jwt.sign(
      { _id: user._id, emailId: user.emailId, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    );

    // ✅ Correct Cookie
    // example
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // or 'none' with secure when cross-site in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      user: {
        firstName: user.firstName,
        emailId: user.emailId,
        role: user.role,
      },
      message: "Login Successful ✅",
    });
  } catch (err) {
    res.status(401).send("Error: " + err.message);
  }
};

const logout = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.send("Already Logged Out");

    const payload = jwt.decode(token);

    await redisClient.set(`token:${token}`, "Blocked");
    await redisClient.expireAt(`token:${token}`, payload.exp);

    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.send("Logged Out Successfully ✅");
  } catch (err) {
    res.status(503).send("Error: " + err.message);
  }
};

// ✅ Use only to create FIRST ADMIN
const adminRegister = async (req, res) => {
  try {
    validate(req.body);

    req.body.password = await bcrypt.hash(req.body.password, 10);

    const user = await User.create(req.body);

    const token = jwt.sign(
      { _id: user._id, emailId: user.emailId, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).send("Admin Registered Successfully ✅");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

const deleteProfile = async (req, res) => {
  try {
    const userId = req.result._id;
    await User.findByIdAndDelete(userId);
    res.status(200).send("Deleted Successfully ✅");
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { register, login, logout, adminRegister, deleteProfile };
