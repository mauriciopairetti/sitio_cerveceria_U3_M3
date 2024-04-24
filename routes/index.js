var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});



router.post('/', async (req, res, next) => {
  console.log(req.body)


  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var password2 = req.body.password2;


  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var asunto = req.body.asunto;
  var mail = req.body.mail;
  var mensaje = req.body.mensaje;



  var obj = {
    // to:'flavia.ursino@gmaiml.com',
    to: 'mauricio.pairetti@gmail.com',
    subject: 'CONTACTO WEB',
    html: username + "Usted se ha registrado en la web CERVECERIA CRAF " + email + " .<br/> con la contraseña: " + password + " y" + password2
  }
  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });



  var obj = {
    // to:'flavia.ursino@gmaiml.com',
    to: 'mauricio.pairetti@gmail.com',
    subject: 'registro WEB',
    html: nombre + apellido + "Usted han mandado mensaje en la web CERVECERIA CRAF " + asunto + mail + " .<br/>" + mensaje
  }
  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });




  var info = await transport.sendMail(obj);

  res.render('index', {
    message: 'Tu Registro fue CORRECTAMENTE enviado.'
  });
});



module.exports = router;

