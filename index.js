const Koa = require('koa');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const routes = require('./routes.js');

const app = new Koa();
var port = 6000;
var server = null;

app.use(bodyParser());
app.use(json());
app.use(routes.routes());
app.use(routes.allowedMethods());

server = app.listen(port, err => {
    if (err) throw err;
    console.log(`> Running on localhost:${port}`);
});