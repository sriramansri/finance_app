import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,      
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

pool.connect((err) => {   
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database successfully!');
    }   
});

export default pool;