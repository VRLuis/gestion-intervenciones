const interventionService = require('../services/interventionService');

/**
 * Consigue todas las intervenciones del tenant
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getAllInterventions = async (req, res) => {
    try {
        const interventions = await interventionService.getInterventionsByTenant(req.idTenant);
        
        return res.status(200).json({
            status: "success",
            results: interventions.length,
            data: interventions
        });
    } catch (error) {
        return res.status(500).json({ 
            message: "Error interno del servidor al recuperar las intervenciones" 
        });
    }
};

/**
 * Crea una nueva intervención asociada al tenant y usuario autenticados
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const createIntervention = async (req, res) => {
    try {
        const { name, surname, place, idInterventionType } = req.body;

        if (!name || !surname || !place || !idInterventionType) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const newIntervention = await interventionService.createIntervention({
            name,
            surname,
            place,
            idInterventionType,
            idTenant: req.idTenant,
            idUser: req.idUser
        });

        return res.status(201).json({
            message: "Intervención registrada con éxito",
            data: newIntervention
        });

    } catch (error) {
        return res.status(500).json({ message: "Error interno al guardar la intervención: " + error.message });
    }
};

/**
 * Consigue todos los tipos de intervención disponibles para el tenant
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getInterventionTypes = async (req, res) => {
    try {
        const types = await interventionService.getAllInterventionTypes();
        
        return res.status(200).json({
            status: "success",
            results: types.length,
            data: types
        });
    } catch (error) {
        return res.status(500).json({ 
            message: "Error al recuperar los tipos de intervención: " + error.message 
        });
    }
};

module.exports = { createIntervention, getAllInterventions, getInterventionTypes };