const Koa = require('koa');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const routes = require('./routes/routes.js');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const app = new Koa();
var port = process.env.PORT;
var server = null;

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
.catch((err)=> console.error("DB Connection errror", err));

app.use(bodyParser());
app.use(json());
app.use(routes.routes());
app.use(routes.allowedMethods());

server = app.listen(port, err => {
    if (err) throw err;
    console.log(`> Running on localhost:${port}`);
});