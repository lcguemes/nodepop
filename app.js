var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const utils = require('./lib/utils');
const LoginController = require('./controllers/LoginController');
const session = require('express-session');
const jwtAuth = require('./lib/jwtAuthMiddleware');
const sessionAuth = require('./lib/sessionMiddleware');



// llevamos a linea 22
//var indexRouter = require('./routes/index');  
//var usersRouter = require('./routes/users');  

var app = express();

// Conectamos a la base de datos mongoose
require('./lib/connectMongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Variables globales de las vistas
app.locals.title = 'NodePop';

const loginController = new LoginController;

/**
 * Rutas de API
 */
app.use ('/apiv1/anuncios', jwtAuth, require('./routes/api/anuncios'));
app.post('/apiv1/login',loginController.postJWT);

/* Multiidioma */
const i18n = require('./lib/i18nConfigure');
const MongoStore = require('connect-mongo');
// Ponemos el middleware i18n diponible en todas las vistas
app.use(i18n.init);
// Prueba rapida para ver que funciona i18n
//i18n.setLocale('es');
//console.log(i18n.__('Welcome to'));

/* Setup de sesiones del website */
app.use(session({
  name: 'nodepop-session',
  secret: '#wW)P/jQ>Zy)U\\F(Y&K<n2y+i^z#F*A',
  saveUninitialized: true,
  resave: false, 
  cookie:{
    maxAge: 1000 * 60 * 60 * 24 * 2 // 2 dias de inactividad
  },
  store: MongoStore.create({mongoUrl: process.env.MONGODB_CONNECTION_STRING})
}));

// Hacemos disponible la sesion en todas las vistas
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

/**
 * Rutas website
 * siempre responder o llamar a next   res.json o next()
 */



app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/features',require('./routes/features'));
app.use('/change-locale',require('./routes/change-locale'));
app.use('/privado', sessionAuth, require('./routes/privado'));

// Usamos el concepto de controladores
app.get('/login',loginController.index);
app.post('/login',loginController.post);
app.get('/logout',loginController.logout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  res.status(err.status || 500);

  if(utils.isAPIRequest(req)){
    res.json({error: err.message}); // se puede poner en una sola linea return res.json({error:err.message});
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  
  res.render('error');
});



module.exports = app;
