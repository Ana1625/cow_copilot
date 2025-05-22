const db = require('../db/connection');

//Registrar ganado
exports.regGanado = async (req, res) => {
    const { id_ganados, nombre, codigo_id, fecha_nacimiento, sexo, peso_kg, estate, created, usuarios_id, razas_id} = req.body;
    try {
        const [result] = await db.promise().query(
            'INSERT INTO ganados (id_ganados, nombre, codigo_id, fecha_nacimiento, sexo, peso_kg, estate, created, usuarios_id, razas_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [id_ganados, nombre, codigo_id, fecha_nacimiento, sexo, peso_kg, estate, created, usuarios_id, razas_id]
        );

        res.status(201).json({
            message: 'Ganado registrado',
            id: result.insertId,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al registrar un ganado' });
    }
};
//metodo para obtener todos los ganados
exports.obtenerGanados = async (req, res) => {
    try {
        const [rows] = await db.promise().query('SELECT * FROM ganados');
        console.log(rows);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener los ganados' });
    }
};
//Actualizar ganado
exports.updateganado = async (req, res) => {
    const id_ganados = parseInt(req.params.id);  // Supongamos que el id viene en la URL
    const {nombre, codigo_id, fecha_nacimiento, sexo, peso_kg, estate, created, usuarios_id, razas_id} = req.body;

    try {
        const [result] = await db.promise().query(
            'UPDATE ganados SET nombre = ?, codigo_id = ?, fecha_nacimiento = ?, sexo = ?, peso_kg = ?, estate = ?, created = ?, usuarios_id = ?, razas_id = ? WHERE id_ganados = ?',
            [nombre, codigo_id, fecha_nacimiento, sexo, peso_kg, estate, created, usuarios_id, razas_id, id_ganados ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'ganado no encontrado' });
        }

        res.json({
            message: 'ganado actualizado correctamente',
            respuesta: { nombre, codigo_id, fecha_nacimiento, sexo, peso_kg, estate, created, usuarios_id, razas_id  },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar el ganado' });
    }
};
//Eliminar ganado
exports.deleteganado = async (req, res) => {
    const id_ganados = parseInt(req.params.id_ganados);

    if (isNaN(id_ganados)) {
        return res.status(400).json({ error: "ID inválido. Debe ser un número." });
    }

    if (!id_ganados) {
        return res.status(400).json({ error: "Debe proporcionar un id_ganados válido" });
    }

    try {
        const [result] = await db.promise().query(
            'DELETE FROM ganados WHERE id_ganados = ?',
            [id_ganados]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "ganado no encontrado" });
        }

        res.json({ message: 'Ganado eliminado exitosamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar el ganado', detalle: err.message });
    }
};
