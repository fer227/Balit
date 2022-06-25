const Router = require('@koa/router');
const router = new Router();
const Controller = require('../controllers/controller.js');

controller = new Controller();

// router.get('/helloworld', async (ctx) => {
//     await controller.helloWorldGet(ctx)
// });

// router.post('/helloworld', async (ctx) => {
//     await controller.helloWorldPost(ctx)
// });

router.post('/paradas', async (ctx) => {
    await controller.newParada(ctx)
});

router.get('/paradas/:id', async (ctx) => {
    await controller.getParada(ctx, ctx.params.id)
});

router.get('/paradas', async (ctx) => {
    await controller.getParadas(ctx)
});

router.post('/lineas', async (ctx) => {
    await controller.newLinea(ctx)
});

router.get('/lineas/:id', async (ctx) => {
    await controller.getLinea(ctx, ctx.params.id)
});

router.get('/lineas', async (ctx) => {
    await controller.getLineas(ctx)
});

module.exports = router;