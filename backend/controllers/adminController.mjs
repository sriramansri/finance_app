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

        const { email, emp_name, emp_roll, sallery } = req.body;

        if (!email || !emp_name || !emp_roll || !sallery) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        //  Check existing user
        const [existingusers] = await db.execute("SELECT * from admin WHERE email = ?", [email]);

        if (existingusers.length > 0) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        //  Insert data
        const [insertEmp] = await db.execute(
            "insert into admin (email, emp_name, emp_roll, sallery) values (?,?,?,?)",
            [email, emp_name, emp_roll, sallery]
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
        if (!req.user) {
            return res.status(401).json({ Message: 'Unauthorized: No user information found' });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({ Message: 'Only admin can use this profile' });
        }
        const { id } = req.params;
        const { email, emp_name, emp_roll, sallery } = req.body;

        const [updateEmp] = await db.execute(
            "update admin set email=?, emp_name=?, emp_roll=?, sallery=? WHERE id = ?", [email, emp_name, emp_roll, sallery, id]
        );
        
        if(updateEmp.affectedRows === 0){
            return res.status(404).json({message: 'staff not found in database' })
        }

        res.status(200).json({ message: 'staffe successfully updated ' })

    } catch (error) {
        console.error('update error:', error);
        res.status(500).json({ error: 'Server error during update' });
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
            "delete from admin WHERE id = ?",[id]
        );
        
        if(deleteEmp.affectedRows === 0){
            return res.status(404).json({message: 'staff not found in database' })
        }

        res.status(200).json({ message: 'staffe successfully deleted ' })

    } catch (error) {
        console.error('update error:', error);
        res.status(500).json({ error: 'Server error during update' });
    }

}