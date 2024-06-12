var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body);

    // Extraer datos del cuerpo de la solicitud
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;
    var nombre = req.body.nombre;
    var apellido = req.body.apellido;
    var asunto = req.body.asunto;
    var mail = req.body.mail;
    var mensaje = req.body.mensaje;

    // Configurar objeto de correo electrónico
    var registroEmail = {
      to: 'mauricio.pairetti@gmail.com',
      subject: 'CONTACTO WEB',
      html: `${username}, usted se ha registrado en la web CERVECERIA CRAFT con el correo ${email}. Su contraseña es ${password} y ${password2}`
    };

    var mensajeEmail = {
      to: 'mauricio.pairetti@gmail.com',
      subject: 'MENSAJE WEB',
      html: `${nombre} ${apellido}, usted ha enviado el siguiente mensaje en la web CERVECERIA CRAFT:<br/>Asunto: ${asunto}<br/>Correo: ${mail}<br/>Mensaje: ${mensaje}`
    };

    // Crear objeto de transporte de correo electrónico
    var transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Enviar correo electrónico de registro
    await transport.sendMail(registroEmail);
    // Enviar correo electrónico del mensaje
    await transport.sendMail(mensajeEmail);

    // Respuesta al cliente
    res.render('index', {
      message: 'Tu registro y mensaje fueron enviados correctamente.'
    });
  } catch (error) {
    console.error(error);
    res.render('index', {
      error: 'Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo.'
    });
  }
});

module.exports = router;

