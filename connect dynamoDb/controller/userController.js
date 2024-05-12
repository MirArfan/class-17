const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

require('aws-sdk/lib/maintenance_mode_message').suppress = true;

// Create DynamoDB service object
// const dynamodb = new AWS.DynamoDB();
const dynamodb=require("../config/database");

exports.getUsers = async (ctx) => {
    const params = {
        TableName: 'UsersTable'
    };
    try {
        const data = await dynamodb.scan(params).promise();
        ctx.status = 200;
        ctx.body = { statusCode: "success", data };
    } catch (error) {
        ctx.status = 400;
        ctx.body = { statusCode: "failed getusers", error: error.message };
    }
};



exports.saveUser = async (ctx) => {
    const newUser = {
        id: 120,
        username: ctx.request.body.username ,
        email:  ctx.request.body.email 
    };

    const params = {
        TableName: 'UsersTable',
        Item: newUser
    };
    try {
        await dynamodb.put(params).promise();
        ctx.status = 200;
        ctx.body = { statusCode: "success created", user: newUser };
    } catch (error) {
        ctx.status = 400;
        ctx.body = { statusCode: "failed created", error: error.message };
    }
};


exports.updateUser = async (ctx) => {
    const userId = ctx.params.id;
    const updatedAttributes = {
        username: { Value: { S: ctx.request.body.username }, Action: 'PUT' },
        email: { Value: { S: ctx.request.body.email }, Action: 'PUT' }
    };

    const params = {
        TableName: 'UsersTable',
        Key: { id: { S: userId } },
        AttributeUpdates: updatedAttributes
    };

    try {
        await dynamodb.updateItem(params).promise();
        ctx.status = 200;
        ctx.body = { statusCode: "successfully updated", userId: userId };
    } catch (error) {
        ctx.status = 400;
        ctx.body = { statusCode: "failed update", error: error.message };
    }
};

exports.deletedUser = async (ctx) => {
    const userId = ctx.params.id;
    const params = {
        TableName: 'UsersTable',
        Key: { id: { S: userId } }
    };
    try {
        await dynamodb.deleteItem(params).promise();
        ctx.body = { statusCode: "deleted user successfully" };
    } catch (error) {
        ctx.status = 400;
        ctx.body = { statusCode: "failed delete user", error: error.message };
    }
};