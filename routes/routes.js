const Router = require('@koa/router');
const router = new Router();
const Controller = require('../controllers/controller.js');

controller = new Controller();

router.get('/helloworld', (ctx) => {
    ctx = controller.helloWorldGet(ctx)
});

router.post('/helloworld', (ctx) => {
    console.log('entra')
    res = controller.helloWorldPost(ctx)
    console.log(res)
    ctx.status = res.status
    ctx.body = res.data
    console.log('sale')
});

module.exports = router;