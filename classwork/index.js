const Koa = require('koa');
const Router = require('koa-router');
const {koaBody} = require('koa-body');

const userRouter = require("./routes/userRouter");
const PORT = 3001;

const app = new Koa();
const router = new Router();


app.use(koaBody());

//user router
router.use(userRouter.routes());



app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx, next) => {
    ctx.status = 404;
    ctx.body = "Resource not found";
});

app.listen(PORT, () => {
    console.log("Server is running");
});
