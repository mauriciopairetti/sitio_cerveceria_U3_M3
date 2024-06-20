var pool = require('./bd');

// Obtener todos los items del carrito
async function getCarrito() {
    try {
        var query = "SELECT * FROM cervezas ORDER BY id ASC";
        var rows = await pool.query(query);
        return rows;
    } catch (error) {
        console.error('Error fetching carrito:', error);
        throw error;
    }
}

// Eliminar item del carrito por ID
async function deleteCarritoId(id) {
    try {
        var query = "DELETE FROM cervezas WHERE id = ?";
        var rows = await pool.query(query, [id]);
        return rows;
    } catch (error) {
        console.error('Error deleting item from carrito:', error);
        throw error;
    }
}

// Insertar un nuevo item en el carrito
async function insertCarrito(obj) {
    try {
        var query = "INSERT INTO cervezas SET ?";
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.error('Error inserting item into carrito:', error);
        throw error;
    }
}

// Obtener item del carrito por ID
async function getCarritoById(id) {
    try {
        var query = "SELECT * FROM cervezas WHERE id = ?";
        var rows = await pool.query(query, [id]);
        return rows[0];
    } catch (error) {
        console.error('Error fetching item by ID from carrito:', error);
        throw error;
    }
}

// Modificar item del carrito por ID
async function modificarCarritoById(obj, id) {
    try {
        var query = "UPDATE cervezas SET ? WHERE id = ?";
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        console.error('Error updating item in carrito:', error);
        throw error;
    }
}

module.exports = { getCarrito, deleteCarritoId, insertCarrito, getCarritoById, modificarCarritoById };
