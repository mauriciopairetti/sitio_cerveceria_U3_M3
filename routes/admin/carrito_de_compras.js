var express = require('express');
var router = express.Router();
var carritoModel = require('../../models/carritoModel');

// GET home page and display carrito de compras
router.get('/', async function (req, res, next) {
    try {
        var carrito_de_compras = await carritoModel.getCarrito();
        res.render('admin/carrito_de_compras', {
            layout: 'admin/layout',
            usuario: req.session.usuario,
            carrito_de_compras,
        });
    } catch (error) {
        console.error('Error fetching carrito de compras:', error);
        next(error);
    }
});

// DELETE item from carrito de compras by ID
router.get('/eliminar/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await carritoModel.deleteCarritoId(id);
        res.redirect('/admin/carrito_de_compras');
    } catch (error) {
        console.error('Error deleting item from carrito de compras:', error);
        next(error);
    }
});

// GET add new item form
router.get('/agregar', async (req, res, next) => {
    // var carrito_de_compras = await carritoModel.getCarrito();
    res.render('admin/agregar', {
        layout: 'admin/layout',

            usuario: req.session.usuario
            // carrito_de_compras
            
        });

    });
// });

// POST add new item to carrito de compras
router.post('/agregar', async (req, res, next) => {
    try {
        const { titulo, subtitulo, cuerpo } = req.body;
        if (titulo && subtitulo && cuerpo) {
            await carritoModel.insertCarrito(req.body);
            res.redirect('/admin/carrito_de_compras');
        } else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            });
        }
    } catch (error) {
        console.error('Error adding item to carrito de compras:', error);
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se pudo cargar la novedad'
        });
    }
});

// GET edit item form by ID
router.get('/modificar/:id', async (req, res, next) => {
    try {
        var id = req.params.id;
        var carrito = await carritoModel.getCarritoById(id);
        res.render('admin/modificar', {
            layout: 'admin/layout',
            usuario: req.session.usuario,
            carrito
        });
    } catch (error) {
        console.error('Error fetching item by ID from carrito de compras:', error);
        next(error);
    }
});

// POST update item in carrito de compras
router.post('/modificar', async (req, res, next) => {
    try {
        const { id, titulo, subtitulo, cuerpo } = req.body;
        if (id && titulo && subtitulo && cuerpo) {
            var obj = { titulo, subtitulo, cuerpo };
            await carritoModel.modificarCarritoById(obj, id);
            res.redirect('/admin/carrito_de_compras');
        } else {
            res.render('admin/modificar', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            });
        }
    } catch (error) {
        console.error('Error updating item in carrito de compras:', error);
        res.render('admin/modificar', {
            layout: 'admin/layout',
            error: true,
            message: 'No se pudo modificar la novedad'
        });
    }
});

module.exports = router;
