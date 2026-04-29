import db from "../dbConfig.mjs";
import nodemailer from "nodemailer";

// தற்காலிகமாக OTP சேமிக்க (நிஜ புராஜெக்ட்டில் இதற்காக தனி டேபிள் பயன்படுத்துவது நல்லது)
let otpStore = {};

// 1. Login Function
export const login = (req, res) => {
  const { email, password } = req.body;
  console.log("Attempting login for:", email);

  const sql = "SELECT * FROM users WHERE email = (?) AND password = (?)";

  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length > 0) {
      return res.json({ Status: "Success", Message: "Login successfully" });
    } else {
      return res
        .status(401)
        .json({ Status: "Error", Message: "Invalid credentials" });
    }
  });
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

  // 6 இலக்க OTP உருவாக்கம் [cite: 8]
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: 'sakthikarthi818@gmail.com',
    pass: 'yhok gnyu hnmf clqp', 
  },
});

  const mailOptions = {
    from: "sakthikarthi818@gmail.com",
    to: email,
    subject: "Finance App - Password Reset OTP",
    text: `பாஸ்வேர்ட் மாற்ற உங்கள் OTP: ${otp}. இதை யாரிடமும் பகிர வேண்டாம்.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ Status: "Success", Message: "OTP Sent to Email" });
  } catch (error) {
    console.error("Nodemailer Error:", error); // This will show the real reason in your terminal
    res.status(500).json({ Status: "Error", Message: error.message });
  }
};

// 3. Verify OTP & Update Password
export const resetPassword = (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (otpStore[email] === otp) {
    const sql = "UPDATE users SET password = ? WHERE email = ?";
    db.query(sql, [newPassword, email], (err, result) => {
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
