let users = require("../models/userModel");
const { v4: uuidv4 } = require('uuid');

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
        const newUser = {
            id: uuidv4(),
            username: ctx.request.body.username,
            email: ctx.request.body.email,
        }
        // const newUser=ctx.request.body;
        users.push(newUser);
        ctx.status = 200;
        ctx.body = { statusCode: "success created", users };
    } catch (error) {
        ctx.status = 400;
        ctx.body = { statusCode: "failed created", error: error.message };
    }
};


exports.updateUser = async (ctx) => {
    try {
        const userId = ctx.params.id;
        const { username, email } = ctx.request.body;

        const userToUpdate = users.find(user => user.id === userId);
        if (!userToUpdate) {
            ctx.status = 404;
            ctx.body = { statusCode: "User not found" };
            return;
        }

        userToUpdate.username = username;
        userToUpdate.email = email;

        ctx.body = { statusCode: "update successfully", users }

    } catch (error) {
        ctx.status = 401;
        ctx.body = { statusCode: "failed update", error: error.message };
    }
}

exports.patchUser = async (ctx) => {
    try {
        const userId = ctx.params.id;
        const { username, email } = ctx.request.body;

        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            ctx.status = 404;
            ctx.body = { statusCode: "User not found" };
            return;
        }

        if (username !== undefined) {
            users[userIndex].username = username;
        }
        if (email !== undefined) {
            users[userIndex].email = email;
        }

        ctx.body = { statusCode: "patch successfully", users };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { statusCode: "Failed patch ", error: error.message };
    }
};





exports.deletedUser = async (ctx) => {
    try {
        let userId = ctx.params.id;
        users = users.filter((user) => user.id !== userId);
        ctx.body = { statusCode: "deleted user successfully", users };

    } catch (error) {
        ctx.status = 401;
        ctx.body = { statusCode: "failed delete user", error: error.message };
    }
}

