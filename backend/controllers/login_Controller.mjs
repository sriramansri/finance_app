import pool from "../dbConfig.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

let otpStore = {};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "Error", message: "Email and password are required" });
    }

   
    

    let user = null;
    let isEmployee = false;

    // 1. Users Table Check (Assuming it has email column)
    const [userResult] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
    
    if (userResult.length > 0) {
      user = userResult[0];
    } else {
      // 2. Employe Table Check (Exact table name from your schema is 'employe')
      const [empResult] = await pool.execute("SELECT * FROM employe WHERE email = ?", [email]);
      if (empResult.length > 0) {
        user = empResult[0];
        isEmployee = true; 
      }
    }

    //  user = userResult[0];

    // Rendu table-layum email illana invalid credentials
    if (!user) {
      return res
        .status(401)
        .json({ status: "Error", message: "Invalid credentials" });
    }

    // 3. Password Verification
    // Users table-la 'password_hash', Employe table-la 'emp_password' (from screenshot)
    const dbPassword = isEmployee ? user.emp_password : user.password_hash;

    if (!dbPassword) {
       return res
        .status(401)
        .json({ status: "Error", message: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, dbPassword);

    if (!isValidPassword) {
      return res
        .status(401)
        .json({ status: "Error", message: "Invalid credentials" });
    }

    // 4. Token & Role generation
    // Rendu table-layume primary key column name 'id' thaan! (from screenshot)
    // const userId = user.id; 
    const userRole = isEmployee ? user.emp_roll : user.role; 

    const token = jwt.sign(
      { id: user.id, role: userRole },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.json({ 
      status: "Success", 
      token: token, 
      role: userRole
    });

  } catch (err) {
    console.error("Login Error: ", err);
    return res
      .status(500)
      .json({ status: "Error", message: "Internal Server Error" });
  }
};





// 2. Forgot Password - Send OTP
export const sendOTP = async (req, res) => {
  const { email } = req.body;

  const [users] = await pool.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  if (users.length == 1) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: "sakthikarthi818@gmail.com", pass: "ojvw quxv hkdp kzcn" },
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
  } else {
    return res
      .status(401)
      .json({ Status: "Error", Message: "Invalid Email" });
  }
};

// 3. Verify OTP & Update Password
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (otpStore[email] === otp) {
    const hash = await bcrypt.hash(newPassword, 10);

    const [users] = await pool.execute(
      "UPDATE users SET password_hash = ? WHERE email = ?",
      [hash, email],
    );

    if (users.length === 0) return res.status(500).json({ Status: "Error", Message: "Failed to update password" });
    delete otpStore[email];
    return res.json({
      Status: "Success",
      Message: "Password updated successfully",
    });
  } else {
    return res.status(400).json({ Status: "Error", Message: "Invalid OTP" });
  }
};
