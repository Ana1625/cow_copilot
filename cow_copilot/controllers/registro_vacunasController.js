const db = require('../db/connection');

//Registrar registro de vacunas
exports.regRegistro_vacuna = async (req, res) => {
    const { fecha_aplicacion, proxima_aplicacion, observaciones, ganados_id, vacunas_id} = req.body;
    try {
        const [result] = await db.promise().query(
            'INSERT INTO registro_vacunas ( fecha_aplicacion, proxima_aplicacion, observaciones, ganados_id, vacunas_id) VALUES (?, ?, ?, ?, ?)',
            [fecha_aplicacion, proxima_aplicacion, observaciones, ganados_id, vacunas_id]
        );

        res.status(201).json({
            respuesta: 'Registro de vacunas registrado',
            id: result.insertId,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al registrar el registro de vacunas' });
    }
};
//metodo para obtener todos los registros de vacuna
exports.obtenerRegistro_vacunas = async (req, res) => {
    try {
        const [rows] = await db.promise().query('SELECT * FROM registro_vacunas');
        console.log(rows);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener el registro de vacunas' });
    }
};
//actualizar registro vacuna
exports.updateRegistro_vacuna = async (req, res) => {
    const id_registroV = parseInt(req.params.id);  // id desde la URL
    const { fecha_aplicacion, proxima_aplicacion, observaciones, ganados_id, vacunas_id } = req.body;

    try {
        const [result] = await db.promise().query(
            'UPDATE registro_vacunas SET fecha_aplicacion = ?, proxima_aplicacion = ?, observaciones = ?, ganados_id = ?, vacunas_id = ? WHERE id_registroV = ?',
            [fecha_aplicacion, proxima_aplicacion, observaciones, ganados_id, vacunas_id, id_registroV]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Registro vacuna no encontrado' });
        }

        res.json({
            message: 'Registro vacuna actualizado correctamente',
            id: id_registroV
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar el registro vacuna' });
    }
};
//Eliminar registro vacuna
exports.deleteRegistro_vacuna = async (req, res) => {
    const id_registroV = parseInt(req.params.id_razas);

    if (isNaN(id_registroV)) {
        return res.status(400).json({ error: "ID inválido. Debe ser un número." });
    }

    if (!id_registroV) {
        return res.status(400).json({ error: "Debe proporcionar un id_registroV válido" });
    }

    try {
        const [result] = await db.promise().query(
            'DELETE FROM registro_vacunas WHERE id_registroV = ?',
            [id_registroV]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "registro vacuna no encontrado" });
        }

        res.json({ message: 'Registro vacuna eliminado exitosamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar el registro de vacuna', detalle: err.message });
    }
};