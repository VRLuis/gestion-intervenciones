const database = require('../db/database');

/**
 * Obtiene las intervenciones asociadas al Tenant
 */
const getInterventionsByTenant = async (tenantId) => {
    const query = `
        SELECT 
            i.idintervention,
            i.name,
            i.surname,
            i.place,
            it.name AS intervention_type_name,
            u.username AS created_by
        FROM intervention i
        INNER JOIN intervention_types it ON i.idinterventiontype = it.idinterventiontype
        INNER JOIN users u ON i.iduser = u.iduser
        WHERE i.idtenant = $1
        ORDER BY i.idintervention DESC;
    `;

    const result = await database.query(query, [tenantId]);
    return result.rows;
};

/**
 * Registra la intervención amarrándola al tenant y usuario del token
 */
const createIntervention = async ({ name, surname, place, idInterventionType, idTenant, idUser }) => {
    const typeCheck = await database.query(
        'SELECT * FROM intervention_types WHERE idinterventiontype = $1',
        [idInterventionType]
    );

    if (typeCheck.rows.length === 0) {
        throw new Error('El tipo de intervención seleccionado no existe.');
    }

    const query = `
        INSERT INTO intervention (name, surname, place, idinterventiontype, idtenant, iduser)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;

    const result = await database.query(query, [
        name,
        surname,
        place,
        idInterventionType,
        idTenant,
        idUser
    ]);

    return result.rows[0];
};

/**
 * Obtiene todos los tipos de intervención disponibles (Globales)
 */
const getAllInterventionTypes = async () => {
    const query = `
        SELECT idinterventiontype, name 
        FROM intervention_types 
        ORDER BY idinterventiontype ASC;
    `;
    const result = await database.query(query);
    return result.rows;
};

module.exports = {
    getInterventionsByTenant,
    createIntervention,
    getAllInterventionTypes 
};