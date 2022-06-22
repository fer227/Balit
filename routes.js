const Router = require('@koa/router');
const router = new Router();
const Controller = require('./Controller.js');

controller = new Controller();

router.get('/helloworld', (ctx) => {
    ctx.status = 200;
    ctx.body = controller.helloWorld()
});

module.exports = router;