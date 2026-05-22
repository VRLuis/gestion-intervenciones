const authService = require('../services/authService');

/**
 * Maneja la petición post de login
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ message: "Campos requeridos" });
        }

        const { token, user } = await authService.login(username, password);

        return res.status(200).json({ token, user });
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

/**
 * Maneja la petición post de registro
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Campos requeridos" });
        }

        const newUser = await authService.register({ username, password });

        return res.status(201).json({ message: "Usuario registrado con éxito" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports = { login, register };