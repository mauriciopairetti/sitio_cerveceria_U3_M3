var express = require('express');
var router = express.Router();
var usuarioModels = require('./../../models/usuarioModels');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('admin/login', {layout: 'admin/layout'});
});

router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.render('admin/login', {
    layout: 'admin/layout' });
    });

router.post('/', async (req, res, next) => {
    try {

        console.log(req.body);
        var usuario = req.body.usuario;
        var password = req.body.password;
        console.log(usuario);
        

        console.log(password);
        var data = await usuarioModels.getUserByUsernameAndPassword(usuario, password);
        
    // usuarioModels.getUserByUsernameAndPassword(usuario, password);
        
        

        if (data != undefined) {
            req.session.id_usuario = data.id;//id de la coumuna base de datos
            req.session.nombre = data.usuario;//nombre de la coumuna base de datos
            res.redirect('/admin/carrito_de_compras');
        } else {

            res.render('admin/login', {
                layout: 'admin/layout', error: true
            });
        }
    } catch (error) {
        console.log(error);
    }
})





module.exports = router;
