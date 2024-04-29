const usersModel = require("../models/userModel")


exports.getUsers = async (ctx) => {
    try {
        const user = await usersModel.get();
        ctx.status=200;
        ctx.body={statusCode: " success", user: user};
    } catch (error) {
        ctx.status=400;
        ctx.body={statusCode: "failed"}
    }
};

exports.saveUser = async (ctx) => {
    try {
        const user=ctx.request.body;
        ctx.status=200;
        ctx.body={statusCode: " success created", user: user};
    } catch (error) {
        ctx.status=400;
        ctx.body={statusCode: "failed created"}
    }
};

