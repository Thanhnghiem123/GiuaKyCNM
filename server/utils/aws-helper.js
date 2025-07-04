require("dotenv").config();

const AWS = require("aws-sdk");

AWS.config.update({
    accessKeyId : process.env.ACCESS_KEY_ID,
    secretAccessKey : process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION
})

const s3 = new AWS.S3();

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports = {s3 , dynamodb}; 