const Router = require('koa-router');
const { getUsers, saveUser, updateUser, deletedUser, patchUser } = require("../controller/userController");

const router = new Router();

// router.patch("/users/:id", patchUser);
router.delete("/users/:id", deletedUser);
router.put("/users/:id",updateUser);
router.get("/users", getUsers);
router.post("/users", saveUser);

module.exports = router;