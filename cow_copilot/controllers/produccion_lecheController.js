const db = require('../db/connection');

//metodo para obtener toda la produccion de leche
exports.obtenerproduccion_leche = async (req, res) => {
    try {
        const [rows] = await db.promise().query('SELECT * FROM produccion_leche');
        console.log(rows);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener la produccion_leche' });
    }
};
//Registrar produccion de leche
exports.regproduccion_leche = async (req, res) => {
    const {fecha, cantidad_litros, produccion_leche, ganados_id} = req.body;
    try {
        const [result] = await db.promise().query(
            'INSERT INTO produccion_leche ( fecha, cantidad_litros, produccion_leche, ganados_id) VALUES (?, ?, ?, ?)',
            [ fecha, cantidad_litros, produccion_leche, ganados_id]
        );

        res.status(201).json({
            message: 'produccion de leche registrada con exito',
            id: result.insertId,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al registrar la produccion de leche' });
    }
};
//Actualizar produccion de leche
exports.updateproduccion_leche = async (req, res) => {
     console.log('req.params:', req.params);
    const id_produccion = parseInt(req.params.id_produccion);  // Supongamos que el id viene en la URL
    
    // Validar que el id_produccion sea un número
    if (isNaN(id_produccion)) {
        return res.status(400).json({ error: 'ID de producción inválido en la URL' });
    }
    const {fecha, cantidad_litros, produccion_leche, ganados_id} = req.body;

    try {
        const [result] = await db.promise().query(
            'UPDATE produccion_leche SET fecha = ?, cantidad_litros = ?, produccion_leche = ?, ganados_id = ?  WHERE id_produccion = ?',
            [fecha, cantidad_litros, produccion_leche, ganados_id, id_produccion]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Produccion de leche no encontrada' });
        }

        res.json({
            message: 'Produccion de leche actualizada correctamente',
            respuesta: {fecha, cantidad_litros, produccion_leche, ganados_id, id_produccion },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar la produccion de leche' });
    }
};
//Eliminar produccion de leche
exports.deleteproduccion_leche = async (req, res) => {
    const id_produccion = parseInt(req.params.id_produccion);

    if (!id_produccion) {
        return res.status(400).json({ error: "Debe proporcionar un id_produccion válido" });
    }

    try {
        const [result] = await db.promise().query(
            'DELETE FROM produccion_leche WHERE id_produccion = ?',
            [id_produccion]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "produccion de leche no encontrada" });
        }

        res.json({ message: 'Produccion de leche eliminada exitosamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar la produccion de leche', detalle: err.message });
    }
};

