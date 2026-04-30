import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DB_USER,      
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,  
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection()
    .then(connection => {
        console.log("Database connection established successfully.");
    })
    .catch(err => {
        console.error("Error connecting to the database:", err);
    });


export default pool;