const Router = require('koa-router');
const { getUsers, saveUser } = require("../controller/userController");

const router = new Router();

router.get("/users", getUsers);
router.post("/users", saveUser);

module.exports = router;