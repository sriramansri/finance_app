import db from "../dbConfig.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// staffe creation
export const insertStaff = async (req, res) => {
    try {

        if (!req.user) {
            return res.status(401).json({ Message: 'Unauthorized: No user information found' });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({ Message: 'Only admin can use this profile' });
        }

        const { email, emp_name, emp_roll, sallery, emp_password } = req.body;

        if (!email || !emp_name || !emp_roll || !sallery || !emp_password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        //  Check existing user
        const [existingusers] = await db.execute(
            "SELECT * from employe WHERE email = ?",
             [email]);

        if (existingusers.length > 0) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        const hash = await bcrypt.hash(emp_password, 10)

        //  Insert data
        const [insertEmp] = await db.execute(
            "insert into employe (email, emp_name, emp_roll, sallery, emp_password) values (?,?,?,?,?)",
            [email, emp_name, emp_roll, sallery, hash]
        );

        res.status(201).json({
            message: 'Employee account created successfully',
            user: {
                id: insertEmp.insertId,
                email,
                name: emp_name,
                role: emp_roll
            }
        });
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Server error during registration' });
    }
};

export const updateStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body; // Frontend-la irunthu vara data

        if (Object.keys(updates).length === 0) {
            return res.status(404).json({ message: 'field is empty' })
        }

        let query = "update admin set ";
        let values = [];
        
        if (updates.emp_password) {
            const saltRounds = 10;
            updates.emp_password = await bcrypt.hash(updates.emp_password, saltRounds);
        }

        Object.keys(updates).forEach((key, index) => {
            if (key === "emp_password") {
                query += `${key}=?`;
                values.push(updates[key]);

            } else {
                query += `${key}=?`;
                values.push(updates[key]);

                if (index < Object.keys(updates).length - 1) {
                    query += ',';
                }
            }
        })

        query += " WHERE id = ?";
        values.push(id);

        const [updateEmp] = await db.execute(query, values);

        if (updateEmp.affectedRows === 0) {
            return res.status(404).json({ message: 'Staff not found' });
        }

        res.status(200).json({ message: 'Updated successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}
export const deleteStaff = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ Message: 'Unauthorized: No user information found' });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({ Message: 'Only admin can use this profile' });
        }
        const { id } = req.params;


        const [deleteEmp] = await db.execute(
            "delete from employe WHERE id = ?", [id]
        );

        if (deleteEmp.affectedRows === 0) {
            return res.status(404).json({ message: 'staff not found in database' })
        }

        res.status(200).json({ message: 'staffe successfully deleted ' })

    } catch (error) {
        console.error('update error:', error);
        res.status(500).json({ error: 'Server error during update' });
    }

}