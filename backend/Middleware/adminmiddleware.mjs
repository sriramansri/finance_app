import jwt from 'jsonwebtoken'
// authMiddleware.mjs
export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer TOKEN

    if (!token) return res.status(401).json({ message: "No token provided" });

    jwt.verify(token, "Sriraman@2005", (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        
        // ithu token-la irukura datava req.user-la stor painuthu
        req.user = decoded; 
        next();
    });
};