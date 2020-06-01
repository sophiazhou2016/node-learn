var createError = require('http-errors');
var express = require('express');
var path = require('path');
const fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

const ENV = process.env.NODE_ENV;
if(ENV !== "production") {
  // 开发环境或测试环境
  app.use(logger('dev', {
    stream: process.stdout
  }));
}else {
  // 线上环境
  const logFileName = path.join(__dirname, 'logs', 'access.log');
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  });
  app.use(logger('combined', {
    stream: writeStream
  }));
}


app.use(express.json()); // postdada json格式
app.use(express.urlencoded({ extended: false })); // x-www-form-urlencoded
// 为了 req.body
app.use(cookieParser()); // req.cookies

const redisClient = require('./db/redis');
const sessionStore = new RedisStore({
  client: redisClient
});
app.use(session({
  secret: 'WJiol_123123#',
  cookie: {
    // path: '/', // 默认
    // httpOnly: true, // 默认
    maxAge: 24 * 60 * 60 * 1000
  },
  store: sessionStore
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
