const database = require('../db/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'intervention';

/**
 * Hace un registro en la aplicación, simplemente inserta un usuario y crea un tenant por cada usuario
 * @param {*} param0 
 * @returns 
 */
const register = async ({ username, password }) => {

    const userCheck = await database.query('SELECT * FROM users WHERE username = $1', [username]);

    if (userCheck.rows.length > 0) {
        throw new Error('El nombre de usuario no puede ser registrado');
    }

    const tenantResult = await database.query(
        'INSERT INTO tenant (name) VALUES ($1) RETURNING idTenant',
        [`${username}`] 
    );
    const newTenantId = tenantResult.rows[0].idtenant;

    const hashedPassword = await bcrypt.hash(password, 10);
    const userResult = await database.query(
        'INSERT INTO users (username, password, idTenant) VALUES ($1, $2, $3) RETURNING idUser, username, idTenant',
        [username, hashedPassword, newTenantId]
    );

    return userResult.rows[0];
};

/**
 * Hace login en la aplicación y si todo va correcto devuelve un token que caduca en 8 horas
 * Si el password es incorrecto devuelve un error.
 * @param {*} username 
 * @param {*} password 
 * @returns 
 */
const login = async (username, password) => {
    const userResult = await database.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = userResult.rows[0];

    if (!user) throw new Error('Credenciales inválidas');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Credenciales inválidas');

    const token = jwt.sign(
        { idUser: user.iduser, idTenant: user.idtenant },
        JWT_SECRET,
        { expiresIn: '8h' }
    );

    return { 
        token, 
        user: { username: user.username } 
    };
};

module.exports = { register, login };