const AWS = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();
AWS.config.update({
    region: process.env.region, 
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    endpoint: process.env.endpoint,
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports = dynamodb;