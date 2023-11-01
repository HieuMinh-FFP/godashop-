const express = require('express');
const ejsLayout = require('express-ejs-layouts');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
var FileStore = require('session-file-store')(session);
const cookieParser = require('cookie-parser')
// Tạo đối tượng express
const app = express();
const port = 80;
const hostname = '127.0.0.1';
// chỉ định thư viện dùng layout
app.use(ejsLayout);

// import global helpers cho toàn bộ project
const helpers = require('./utils/helpers');
app.locals.helpers = helpers;
app.use(cookieParser());
// chỉ định thư mục chứa template
// ./views là đường dẫn đến thư mục
app.set('views', './views');

// chỉ định view engine
app.set('view engine', 'ejs');

// chỉ định thư mục public chứa file css, js, images,...
app.use(express.static(path.join(__dirname, 'public')));
// console.log(path.join(__dirname, 'public'));
// console.log(__dirname);

// Đặt bodyParser trước use router
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
var fileStoreOptions = {};
app.use(session({
    store: new FileStore(fileStoreOptions),
    secret: 'con gà đang ăn thóc',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}))


const indexRouter = require('./routers/IndexRouter')

// middleware
//tham số của middleware là 1 callback function
// ở đây callback function là 1 arrow function 
app.use((req, res, next) => {
    app.locals.currentRoute = helpers.getCurrentRoute(req.path);
    app.locals.session = req.session
    next();
});

app.use('/', indexRouter);
// app.use('/admin', adminRouter);

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${hostname}:${port}`);
})