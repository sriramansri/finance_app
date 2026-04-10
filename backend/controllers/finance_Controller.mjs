import pool from "../dbConfig.mjs";

export const login = (req, res) => {
    const sql = "SELECT * FROM users WHERE email=? AND password=?";

    pool.query(sql, [req.body.email, req.body.password], (err, result) => {

        if (err) return res.json({ err: err });

        if (result.length > 0) {
            console.log("correct email and password");
        } 
        else {
            console.log("Wrong email or password");
        }
    })
}