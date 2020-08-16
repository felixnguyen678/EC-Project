require('dotenv').config();
const express = require('express');
const expressHbs = require('express-handlebars');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

var bodyParser = require('body-parser');
const hdb = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Router
let coursesRouter = require('./routers/course.router.js')
let homeRouter = require('./routers/home.router.js');
let cartRouter = require('./routers/cart.router.js');
let userRouter = require('./routers/user.router.js');
let paymentRouter = require('./routers/payment.router.js');
let sinhvien = require('./routers/sinhvien.js');
let sanpham =require('./routers/sanpham.js');

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(express.json({ extended: false }));

// handlebar engine
let hbs = expressHbs.create({
	extname: 'hbs',
	defaultLayout: 'layout',

	layoutsDir: __dirname + '/views/layouts/',
	partialsDir: __dirname + '/views/partials/',
	handlebars: allowInsecurePrototypeAccess(hdb)
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//connect to db
mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));

// use router
app.use('/', homeRouter);
app.use('/courses', coursesRouter);
app.use('/cart', cartRouter);
app.use('/users', userRouter);
app.use('/payment', paymentRouter);
app.use('/admin', sinhvien);
app.use('/admin',sanpham);

// listen
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), () => {
	console.log(`Server is running at port ${app.get('port')}`);
});
