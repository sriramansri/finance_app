import db from "../dbConfig.mjs";

export const login = (req, res) => {
  const { email, password } = req.body;
  console.log("Attempting login for:", email);

  const sql = "SELECT * FROM users WHERE email = (?) AND password = (?)";

  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).json(err);

    console.log("Database result:", result);

    if (result.length > 0) {
      return res.json({result:"login successfully"});
    } else {
      return res
        .status(401)
        .json({ Status: "Error", Message: "Invalid credentials" });
    }
  });
};
