const express = require('express');
const app = express();
//const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

app.use(cors());
app.options('*', cors())

//Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);

 
//routes
const categoriesRouter = require('../backend/routers/categories');
const productsRouter = require('../backend/routers/products');
const usersRouter = require('../backend/routers/users');
const ordersRouter = require('../backend/routers/orders');


const api = process.env.API_URL;

app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/orders`, ordersRouter);

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  
})
.then(()=>{
    console.log('database is connected')
})
.catch((err)=>{
    console.log(err);
});



//app.listen(3000);


//production
var server = app.listen(process.env.PORT || 3000, function (){
    var port = server.address().port;
    console.log("Express is working on port" + port) 
})
