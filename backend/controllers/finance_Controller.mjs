import db from "../dbConfig.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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
    console.log(token);
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