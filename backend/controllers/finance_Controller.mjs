import db from "../dbConfig.mjs";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are notvalide' })
    }
    const [users] = await db.execute("SELECT * FROM users WHERE email = (?)", [email]);

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];

    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      "Sriraman@2005",
      { expiresIn: "24h" }
    );
    res.json({
      status: "Success",
      token: token,
      role: user.role
    });
  } catch (error) {
    console.log("FULL ERROR DETAILS:", error);
    return res.status(500).json({ status: "Error", message: error.message });
  }
};

// staffe creation
export const creatstaffe = async (req, res) => {
  try {
    const { email, sttafename, sttafRoll, sallery } = req.body;
    //Only admin can create
    if (req.user.role !== developer) {
      return res.status(401).json({ Message: 'admin can use this profile' });
    }
    if (!email || !sttafename || !sttafRoll || !sallery) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const [existingusers] = await db.execute(
      "SELECT * from admin WHERE email = ?", [email]
    );
    if (existingusers.length > 0) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const [creatEmp] = await db.execute(
      "insert into admin (email,sttafename, sttafRoll, sallery) values (?,?,?,?)",[email,sttafename,sttafRoll,sallery]
    );
    res.status(201).json({
      message: 'Employee account created successfully',
      user: {
        id: creatEmp.insertId,
        email,
        name,
        role: sttafRoll
      }
    });
  }
  catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
};