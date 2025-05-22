const db = require('../db/connection');

//Registrar ventas
exports.regVentas = async (req, res) => {
    const { id_ventas, tipo_venta, fecha, precio, comprador_vendedor, observaciones, ganados_id} = req.body;
    try {
        const [result] = await db.promise().query(
            'INSERT INTO ventas ( tipo_venta, fecha, precio, comprador_vendedor, observaciones, ganados_id) VALUES (?, ?, ?, ?, ?, ?)',
            [tipo_venta, fecha, precio, comprador_vendedor, observaciones, ganados_id]
        );

        res.status(201).json({
            respuesta: 'Venta registrada',
            id: result.insertId,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al registrar una venta' });
    }
};
//metodo para obtener todas las ventas
exports.obtenerVentas = async (req, res) => {
    try {
        const [rows] = await db.promise().query('SELECT * FROM ventas');
        console.log(rows);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener las ventas' });
    }
};
//Actualizar Ventas
exports.updateVentas = async (req, res) => {
    const id_ventas = parseInt(req.params.id);  // id viene en la URL
    const { tipo_venta, fecha, precio, comprador_vendedor, observaciones, ganados_id } = req.body;

    if (isNaN(ganados_id)) {
        return res.status(400).json({ error: "ganados_id inválido o no numérico" });
    }

    try {
        // Verifica si el ganado existe (para evitar error por foreign key)
        const [ganadoCheck] = await db.promise().query(
            'SELECT id_ganados FROM ganados WHERE id_ganados = ?',
            [ganados_id]
        );

        if (ganadoCheck.length === 0) {
            return res.status(400).json({ error: "El ganado con ese ID no existe" });
        }

        // Ejecutar actualización
        const [result] = await db.promise().query(
            `UPDATE ventas 
             SET tipo_venta = ?, fecha = ?, precio = ?, comprador_vendedor = ?, observaciones = ?, ganados_id = ? 
             WHERE id_ventas = ?`,
            [tipo_venta, fecha, precio, comprador_vendedor, observaciones, ganados_id, id_ventas]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }

        res.json({
            message: 'Venta actualizada correctamente',
            respuesta: { id_ventas, tipo_venta, fecha, precio, comprador_vendedor, observaciones, ganados_id },
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar la venta' });
    }
};
//Eliminar Venta
exports.deleteVenta = async (req, res) => {
    const id_ventas = parseInt(req.params.id);

    if (isNaN(id_ventas)) {
        return res.status(400).json({ error: "ID inválido. Debe ser un número." });
    }

    if (!id_ventas) {
        return res.status(400).json({ error: "Debe proporcionar un id_razas válido" });
    }

    try {
        const [result] = await db.promise().query(
            'DELETE FROM ventas WHERE id_ventas = ?',
            [id_ventas]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Venta no encontrada" });
        }

        res.json({ message: 'Venta eliminada exitosamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar la venta', detalle: err.message });
    }
};
