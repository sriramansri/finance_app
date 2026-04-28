import db from "../dbConfig.mjs";
import jwt from "jsonwebtoken"

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are notvalide' })
    }
    const [users] = await pool.execute
      ("SELECT * FROM users WHERE email = (?)", [email]);

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
    return res.status(500).json({ Status: "Error", Message: 'Server error during login'});
  }
};

