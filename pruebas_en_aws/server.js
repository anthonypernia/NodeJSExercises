require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const aws = require('aws-sdk');
aws.config.update({
    region: 'us-east-1',

});

const sns = new aws.SNS();
const SNS_TOPIC_ARN = 'arn:aws:sns:us-east-1:326840770667:notifications-coder:ef1fbe8b-9f47-4e11-a75c-b53f97409f3f'
const DYNAMO_DB = new aws.DynamoDB.DocumentClient();
const TABLE_NAME = 'table-anthony';

const users = [
    {
        id: 1,
        name: 'anthony1',
        age: 29
    },
    {
        id: 2,
        name: 'anthony2',
        age: 29
    }
];

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res, next) => {
    res.json('ok');
}
);

app.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
}
);