//llamamos la bd
const db = require('../db/connection');

//metodo para obtener todos los usuarios
exports.getUser = async (req, res) => {
    try {
        const [rows] = await db.promise().query('SELECT * FROM usuarios');
        console.log(rows);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

//Registrar un usuario
exports.registrarUsuario = async (req, res) => {
    const { nombre, correo, contraseña } = req.body;
    console.log(nombre);
    try {
        const [result] = await db.promise().query(
            'INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)',
            [nombre, correo, contraseña]
        );

        res.status(201).json({
            message: 'Usuario registrado',
            id: result.insertId,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
};

//Actualizar usuario
exports.updateusuarios = async (req, res) => {
    const id = parseInt(req.params.id);  // Supongamos que el id viene en la URL
    const { nombre, correo } = req.body;

    try {
        const [result] = await db.promise().query(
            'UPDATE usuarios SET nombre = ?, correo = ? WHERE id_usuarios = ?',
            [nombre, correo, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({
            message: 'Usuario actualizado correctamente',
            usuario: { id, nombre, correo },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};
//Eliminar usuario
exports.deleteusuario = async (req, res) => {
    const id = parseInt(req.params.id_usuarios);

    if (!id) {
        return res.status(400).json({ error: "Debe proporcionar un id_usuarios válido" });
    }

    try {
        const [result] = await db.promise().query(
            'DELETE FROM usuarios WHERE id_usuarios = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar el usuario', detalle: err.message });
    }
};

