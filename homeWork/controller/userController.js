const users = require("../models/userModel");

exports.getUsers = async (ctx) => {
    try {
        
        ctx.status = 200;
        ctx.body = { statusCode: "success", users: users };
    } catch (error) {
        ctx.status = 400;
        ctx.body = { statusCode: "failed getusers" };
    }
};


exports.saveUser = async (ctx) => {
    try {
        const newUser = ctx.request.body;
        users.push(newUser);
        ctx.status = 200;
        ctx.body = { statusCode: "success created", users };
    } catch (error) {
        ctx.status = 400;
        ctx.body = { statusCode: "failed created", error: error.message };
    }
};
