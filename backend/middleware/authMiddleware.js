const jwt = require('jsonwebtoken');

const JWT_SECRET = "intervention";

const requireAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ 
            message: "Acceso denegado. Token no proporcionado." 
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.idUser = decoded.idUser;
        req.idTenant = decoded.idTenant;

        next();
    } catch (error) {
        return res.status(403).json({ 
            message: "Token inválido o expirado." 
        });
    }
};

module.exports = requireAuth;