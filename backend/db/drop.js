const database = require('./database');

async function dropTables() {
    try {
        await database.query(`
            DROP TABLE intervention;
            DROP TABLE intervention_types;
            DROP TABLE users;
            DROP TABLE tenant;
        `);

        console.log("Éxito al borrar la base de datos!");
    } catch (error) {
        console.error("Error borrando la base de datos:", error);
    }
}

dropTables();