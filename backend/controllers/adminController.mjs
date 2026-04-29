import db from "../dbConfig.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// staffe creation
export const creatstaffe = async (req, res) => {
    try {

        if (!req.user) {
            return res.status(401).json({ Message: 'Unauthorized: No user information found' });
        }

        // developer string-ah irukkanum
        if (req.user.role !== 'developer') {
            return res.status(403).json({ Message: 'Only developers/admins can use this profile' });
        }

        const { email, sttafename, sttafRoll, sallery } = req.body;

        if (!email || !sttafename || !sttafRoll || !sallery) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        //  Check existing user
        const [existingusers] = await db.execute("SELECT * from admin WHERE email = ?", [email]);

       

        if (existingusers.length > 0) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        //  Insert data
        const [creatEmp] = await db.execute(
            "insert into admin (email, sttafename, sttafRoll, sallery) values (?,?,?,?)",
            [email, sttafename, sttafRoll, sallery]
        );

        res.status(201).json({
            message: 'Employee account created successfully',
            user: {
                id: creatEmp.insertId,
                email,
                name: sttafename, // Inga 'name' nu irunthathu, 'sttafename' nu mathirukken
                role: sttafRoll
            }
        });
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Server error during registration' });
    }
};