var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var methodOverride = require('method-override')
var session = require('express-session');
var ueditor = require("ueditor");
var controls = require('./controllers');
var ueditorControls = controls.ueditor;
var routes = require('./routes');
var oauth2lib = require('oauth20-provider');
var oauth2 = new oauth2lib({log: {level: 2}});
var app = express();


app.use(session({ 
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { 
       maxAge: 1000*60*30
    },
    secure:false
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use("/ue/upload", ueditor(path.join(__dirname, 'public'), ueditorControls.post));


//认证服务
app.use(oauth2.inject());
app.post('/token', oauth2.controller.token);
app.get('/authorization', isAuthorized, oauth2.controller.authorization, function(req, res) {
    // Render our decision page
    // Look into ./test/server for further information
    res.render('authorization', {layout: false});
});
app.post('/authorization', isAuthorized, oauth2.controller.authorization);

function isAuthorized(req, res, next) {
    if (req.session.authorized) next();
    else {
      // res.redirect("/login");
        var params = req.query;
        params.backUrl = req.path;
        res.redirect('/login?' + query.stringify(params));
    }
};
// app.use(function(req,res,next){ 
//     res.locals.user = req.session.user;
//     req.signedCookies.token = 'token';
//     // console.log('---------------')
//     // console.log(res.locals.user)
//     // console.log('---------------')
//     var err = req.session.error;
//     delete req.session.error;
//     res.locals.message = "";
//     if(err){ 
//         res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+err+'</div>';
//     }
//     next();
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.redirect('/');
  // next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('common/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('common/error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
