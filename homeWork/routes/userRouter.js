const Router = require('koa-router');
const { getUsers, saveUser, updateUser, deletedUser } = require("../controller/userController");

const router = new Router();

router.delete("/users/:id", deletedUser);
router.put("/users/:id",updateUser);
router.get("/users", getUsers);
router.post("/users", saveUser);

module.exports = router;