const Koa = require('koa');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const routes = require('./routes/routes.js');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const app = new Koa();
var port = process.env.PORT;
var server = null;

// Mongoose connection to database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoCreate : true,
    setDefaultsOnInsert: true
})
.then(() => {console.log("DB connected");

})
.catch((err)=> console.error("DB connection errror", err));

// Plugins
app.use(bodyParser());
app.use(json());
// Routes of router
app.use(routes.routes());
// Only respond to routes
app.use(routes.allowedMethods());

// Launch server
server = app.listen(port, err => {
    if (err) throw err;
    console.log(`> Running on localhost:${port}`);
});