
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');

dotenv.config();



AWS.config.update({
    region: process.env.region,
    endpoint: process.env.endpoint,

});

const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.getUsers = async (ctx) => {
    const {id}=ctx.params;
    // const id = toString(ctx.params.id);
    const params = {
        TableName: 'UsersTable',
        Key:{
            id,
        }
    };
   
    
    try {
        const data = await dynamodb.get(params).promise();
        ctx.status = 200;
        ctx.body = { statusCode: "success", data };
    } catch (error) {
        ctx.status = 400;
        ctx.body = { statusCode: "failed getusers", error: error.message };
    }
};



exports.saveUser = async (ctx) => {
    // const newUser = {
    //     id: 120,
    //     username: ctx.request.body.username ,
    //     email:  ctx.request.body.email 
    // };
    const { username, email } = ctx.request.body;
    console.log(username, email)
    const id = uuidv4();
    const params = {
        TableName: 'UsersTable',

        Item: {
            id,
            username,
            email,

        }
    };
    try {
        await dynamodb.put(params).promise();
        ctx.status = 200;
        ctx.body = { statusCode: "success created", user: params };
    } catch (error) {
        ctx.status = 400;
        ctx.body = { statusCode: "failed created", error: error.message };
    }
};


exports.updateUser = async (ctx) => {
    const id = toString(ctx.params.id);
    const updatedAttributes = {
        username: { Value: { S: ctx.request.body.username }, Action: 'PUT' },
        email: { Value: { S: ctx.request.body.email }, Action: 'PUT' }
    };

    const params = {
        TableName: 'UsersTable',
        Key: { id },
        AttributeUpdates: updatedAttributes
    };

    try {
        await dynamodb.update(params).promise();
        ctx.status = 200;
        ctx.body = { statusCode: "successfully updated", userId: userId };
    } catch (error) {
        ctx.status = 400;
        ctx.body = { statusCode: "failed update", error: error.message };
    }
};

exports.deletedUser = async (ctx) => {
    const {id} =ctx.params;
    const params = {
        TableName: 'UsersTable',
        Key: { id }
    };
    try {
        await dynamodb.delete(params).promise();
        ctx.body = { statusCode: "deleted user successfully" };
    } catch (error) {
        ctx.status = 400;
        ctx.body = { statusCode: "failed delete user", error: error.message };
    }
};