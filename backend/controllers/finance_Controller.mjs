import db from "../dbConfig.mjs";
import jwt from "jsonwebtoken"

export const login = (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = (?) AND password = (?)";

  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length > 0) {
      const user = result[0];

      const token = jwt.sign(
        {id : user.id, role: user.role},
        "Sriraman@2005",
        {expiresIn:"7d"}
      );
      return res.json({
        status:"Success",
        token:token,
        role:user.role
      });
    } else {
      return res
        .status(401)
        .json({ Status: "Error", Message: "Invalid credentials" });
    }
  });
};
