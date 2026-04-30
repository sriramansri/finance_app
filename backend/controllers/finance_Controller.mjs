import db from "../dbConfig.mjs";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

let otpStore = {};

// 1. Login Function
export const login = async (req, res) => {
  console.log("Login request received with body:", req.body);
  try {
    const { email, password } = req.body;
    console.log("Attempting login for:", email);

    const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res
        .status(401)
        .json({ status: "Error", message: "Invalid credentials" });
    }

    const user = users[0];

    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res
        .status(401)
        .json({ status: "Error", message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, "Sriraman@2005", {
      expiresIn: "24h",
    });

    return res.json({
      status: "Success",
      token: token,
      role: user.role,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: "Error", message: "Internal Server Error" });
  }
};

// 2. Forgot Password - Send OTP
export const sendOTP = async (req, res) => {
  const { email } = req.body;

  console.log("Attempting to send OTP for:", email);

  const sql = "SELECT * FROM users WHERE email = (?)";

  db.query(sql, [email], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length > 0) {
      return res.json({ Status: "Success", Message: "Login successfully" });
    } else {
      return res
        .status(401)
        .json({ Status: "Error", Message: "Invalid credentials" });
    }
  });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "sakthikarthi818@gmail.com",
      pass: "ojvw quxv hkdp kzcn",
    },
  });

  const mailOptions = {
    from: "sakthikarthi818@gmail.com",
    to: email,
    subject: "Finance App - Password Reset OTP",
    text: `Reset Password OTP: ${otp}. Do not share this OTP with anyone.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ Status: "Success", Message: "OTP Sent to Email" });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    res.status(500).json({ Status: "Error", Message: error.message });
  }
};

// 3. Verify OTP & Update Password
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (otpStore[email] === otp) {
    const hash = await bcrypt.hash(newPassword, 10);
    const sql = "UPDATE users SET password_hash = ? WHERE email = ?";

    db.query(sql, [hash, email], (err, result) => {
      if (err) return res.status(500).json(err);
      delete otpStore[email];
      return res.json({
        Status: "Success",
        Message: "Password updated successfully",
      });
    });
  } else {
    return res.status(400).json({ Status: "Error", Message: "Invalid OTP" });
  }
};
