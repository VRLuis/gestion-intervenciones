const database = require('./database');

async function initializeDatabase() {
    try {
        await database.query(`
            CREATE TABLE IF NOT EXISTS tenant (
                idTenant SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE
            );

            CREATE TABLE IF NOT EXISTS users (
                idUser SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                idTenant INT REFERENCES tenant(idTenant) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS intervention_types (
                idInterventionType SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE
            );

            CREATE TABLE IF NOT EXISTS intervention (
                idIntervention SERIAL PRIMARY KEY,
                idTenant INT REFERENCES tenant(idTenant) ON DELETE CASCADE,
                idUser INT REFERENCES users(idUser),
                name VARCHAR(255) NOT NULL,
                surname VARCHAR(255) NOT NULL,
                place VARCHAR(255) NOT NULL,
                idInterventionType INT REFERENCES intervention_types(idInterventionType)
            );

            INSERT INTO intervention_types (name) VALUES 
                ('Colisión Frontal / Alcance'),
                ('Salida de Vía con Volcado'),
                ('Atropello a Peatón/Ciclista'),
                ('Asistencia Mecánica / Obstrucción'),
                ('Limpieza de Calzada por Derrame')
                ON CONFLICT (name) DO NOTHING;
        `);

        console.log("Éxito al inicializar la base de datos!");
    } catch (error) {
        console.error("Error inicializando la base de datos:", error);
    }
}

initializeDatabase();