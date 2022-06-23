const Router = require('@koa/router');
const router = new Router();
const Controller = require('../controllers/controller.js');

controller = new Controller();

router.get('/helloworld', async (ctx) => {
    await controller.helloWorldGet(ctx)
});

router.post('/helloworld', async (ctx) => {
    await controller.helloWorldPost(ctx)
});

module.exports = router;