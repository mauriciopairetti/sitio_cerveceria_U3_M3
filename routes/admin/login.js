var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModel');

// Ruta para renderizar la página de inicio de sesión
router.get('/', function (req, res, next) {
     res.render('admin/login', {

        // res.render('admin/carrito_de_compras', {
       layout: 'admin/layout' 
    });
});

// Ruta para cerrar sesión
router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.render('admin/login', {

        // res.render('admin/carrito_de_compras', {
       layout: 'admin/layout' 
    });
});

// Ruta para manejar el inicio de sesión
router.post('/', async (req, res, next) => {
    try {

       console.log(req.body);
        var usuario = req.body.usuario;
        var password = req.body.password;
        console.log(usuario);
        console.log(password);



        var data = await usuariosModel.getUserAndPassword(usuario, password);
        console.log(data)

        if (data != undefined) {

            // req.session.id_usuario = data.id;
            // console.log(req.session.id_usuario);

            req.session.id_usuario = data.id;
            // console.log(req.session.id_usuario);
            console.log(data.id);
            // console.log(data.id_usuario);
            
            
            //  req.session.nombre = data.usuario;
            //  console.log(req.session.nombre);

            req.session.usuario = data.usuario;
            console.log(req.session.usuario);

            res.redirect('/admin/carrito_de_compras');
            
        } else {
            res.render('admin/login', {
                layout: 'admin/layout', 
                error: true,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;

