var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev')); // app.use： 注册
app.use(express.json()); // postdada json格式
app.use(express.urlencoded({ extended: false })); // x-www-form-urlencoded
// 为了 req.body
app.use(cookieParser()); // req.cookies

app.use(session({
  secret: 'WJiol_123123#',
  cookie: {
    // path: '/', // 默认
    // httpOnly: true, // 默认
    maxAge: 24 * 60 * 60 * 1000
  }
}));
// app.use(express.static(path.join(__dirname, 'public')));

// 注册路由
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter); // 父路由的好处：修改方便
app.use('/api/user', userRouter); // 父路由的好处：修改方便

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
