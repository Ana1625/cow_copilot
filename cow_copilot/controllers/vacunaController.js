const db = require('../db/connection');

//Registrar vacuna
exports.regVacuna = async (req, res) => {
    const {nombre, descripcion} = req.body;
    try {
        const [result] = await db.promise().query(
            'INSERT INTO vacunas (nombre, descripcion) VALUES (?, ?)',
            [nombre, descripcion]
        );

        res.status(201).json({
            message: 'vacuna registrada',
            id: result.insertId,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al registrar una vacuna' });
    }
};
//metodo para obtener todos las vacunas
exports.obtenerVacunas = async (req, res) => {
    try {
        const [rows] = await db.promise().query('SELECT * FROM vacunas');
        console.log(rows);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener las vacunas' });
    }
};
//Actualizar vacunas
exports.updateVacunas = async (req, res) => {
    const id_vacunas = parseInt(req.params.id);  // Supongamos que el id viene en la URL
    const { nombre, descripcion } = req.body;

    try {
        const [result] = await db.promise().query(
            'UPDATE vacunas SET nombre = ?, descripcion = ? WHERE id_vacunas = ?',
            [nombre, descripcion, id_vacunas]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Vacuna no encontrada' });
        }

        res.json({
            message: 'Vacuna actualizada correctamente',
            respuesta: { nombre, descripcion },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar la vacuna' });
    }
};
//Eliminar vacuna
exports.deletevacuna = async (req, res) => {
    const id_vacunas = parseInt(req.params.id_vacunas);

    if (!id_vacunas) {
        return res.status(400).json({ error: "Debe proporcionar un id_usuarios válido" });
    }

    try {
        const [result] = await db.promise().query(
            'DELETE FROM vacunas WHERE id_vacunas = ?',
            [id_vacunas]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Vacuna no encontrada" });
        }

        res.json({ message: 'Vacuna eliminada exitosamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar la vacuna', detalle: err.message });
    }
};

