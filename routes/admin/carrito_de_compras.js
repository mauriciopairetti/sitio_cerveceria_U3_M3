var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('admin/carrito_de_compras', {
        layout: 'admin/layout', 
        // nom_persona_login: req.session.nombre,
        usuario:req.session.usuario,

        // usuario:req.session.nombre,
        
        
        
    })
});
 

module.exports = router;

