const db = require('../db/connection');

//Registrar razas
exports.regRazas = async (req, res) => {
    const { id_razas, nombre_raza, descripcion} = req.body;
    try {
        const [result] = await db.promise().query(
            'INSERT INTO razas (id_razas, nombre_raza, descripcion) VALUES (?, ?, ?)',
            [id_razas, nombre_raza, descripcion]
        );

        res.status(201).json({
            respuesta: 'Raza registrada',
            id: result.insertId,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al registrar una raza' });
    }
};
//metodo para obtener todos las razas
exports.obtenerRazas = async (req, res) => {
    try {
        const [rows] = await db.promise().query('SELECT * FROM razas');
        console.log(rows);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener las razas' });
    }
};
//Actualizar Razas
exports.updateRazas = async (req, res) => {
    const id_razas = parseInt(req.params.id);  // Supongamos que el id viene en la URL
    const { nombre_raza, descripcion} = req.body;

    try {
        const [result] = await db.promise().query(
            'UPDATE razas SET nombre_raza = ?, descripcion = ? WHERE id_razas = ?',
            [nombre_raza, descripcion, id_razas ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Raza no encontrada' });
        }

        res.json({
            message: 'Raza actualizada correctamente',
            respuesta: { id_razas, nombre_raza, descripcion},
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar la raza' });
    }
};
//Eliminar raza
exports.deleteRaza = async (req, res) => {
    const id_razas = parseInt(req.params.id_razas);

    if (isNaN(id_razas)) {
        return res.status(400).json({ error: "ID inválido. Debe ser un número." });
    }

    if (!id_razas) {
        return res.status(400).json({ error: "Debe proporcionar un id_razas válido" });
    }

    try {
        const [result] = await db.promise().query(
            'DELETE FROM razas WHERE id_razas = ?',
            [id_razas]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "raza no encontrada" });
        }

        res.json({ message: 'Raza eliminada exitosamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar la raza', detalle: err.message });
    }
};
