import db from "../dbConfig.mjs";

export const admins = (req, res) => {
    const sql = "SELECT * FROM admin";
    db.query(sql, (err, data) => {
        (result.length > 0) ?
            res.json({ data }):
            console.log('false');
    })
}
export const addemp =  (req,res) => {
    const {sttafename,sttafRoll,sallery} = req.body
    const sql = "insert into admin(sttafename,sttafRoll,sallery) values(?,?,?)";
    db.query(sql,[sttafename,sttafRoll,sallery], (err, result) => {
        return res.json({result:'karthi' })
    })
}
export const editstaff = (req, res) => {
    const { id, sttafename, sttafRoll, sallery } = req.body;

    // First, staff irukkangala nu check panrom
    const checkSql = "SELECT * FROM admin WHERE id = ?";
    
    db.query(checkSql, [id], (err, result) => {
        if (err) return res.json({ Error: "Query error" });

        if (result.length > 0) {
            // Update query ezhudhum murai
            const updateSql = "UPDATE admin SET sttafename = ?, sttafRoll = ?, sallery = ? WHERE id = ?";
            
            db.query(updateSql, [sttafename, sttafRoll, sallery, id], (err, updateResult) => {
                if (err) return res.json({ Error: "Update pannumbodhu error vandhuchu" });
                return res.json({ Status: "Success", Message: "Staff details update aayidichu!" });
            });
        } else {
            return res.json({ Status: "Error", Message: "Intha ID-la yaarum illai" });
        }
    });
};