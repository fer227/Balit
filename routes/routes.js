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

router.get('/paradas/linea/:id', async (ctx) => {
    await controller.getParadasByLinea(ctx, ctx.params.id)
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

router.post('/puntosdeinteres', async (ctx) => {
    await controller.newPuntoDeInteres(ctx)
});

router.get('/puntosdeinteres/:id', async (ctx) => {
    await controller.getPuntoDeInteres(ctx, ctx.params.id)
});

router.get('/puntosdeinteres', async (ctx) => {
    await controller.getPuntosDeInteres(ctx)
});

router.get('/puntosdeinteres/parada/:id', async (ctx) => {
    await controller.getPuntosDeInteresByParada(ctx, ctx.params.id)
});

router.post('/initializeDB', async (ctx) => {
    await controller.initializeDB(ctx)
});

module.exports = router;