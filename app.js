const myexpress = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const userRouter = require('./router/userRouter');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const viewRouter = require('./router/viewRouter');
const productRouter=require('./router/productRouter')
const ejs = require('ejs');
const app = myexpress();

app.use(logger('dev'));
app.set('views', __dirname + '/view');
app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(session({
    secret: '123',
    name: 'testapp',
    cookie: {
        maxAge: 800000
    },
    rolling:true,
    resave:true
}))
app.use(userRouter);
app.use(viewRouter);
app.use(productRouter);
app.use(myexpress.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/favicon.ico'))



app.listen(8888);
console.log('Service started successfully');