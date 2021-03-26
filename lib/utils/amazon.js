require('dotenv').config();
const { LexModelBuildingService } = require('aws-sdk');
const AWS = require('aws-sdk');

AWS.config.update({region: 'REGION'});

const sendEmailTo = (email, message) => {
    
    const params = {
        Destination: {
            /* required */
            CcAddresses: [
            ],
            ToAddresses: [
                `dylan.whitej@gmail.com`,
                /* more items */
            ],  
        },
        Message: {
            /* required */
            Body: {
                /* required */
                Html: {
                    Charset: 'UTF-8',
                    Data: 'HTML_FORMAT_BODY',
                },
                Text: {
                    Charset: 'UTF-8',
                    Data: `it worked`,
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Test email',
            },
        },
        Source: 'dylan.whitej@gmail.com' /* required */,
        ReplyToAddresses: [
            'dylan.whitej@gmail.com',
            /* more items */
        ],
    };
    
    const SESconfig = {
        apiVersion: '2010-12-01',
        accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
        region: 'us-east-2'
    };

    new AWS.SES(SESconfig).sendEmail(params).promise().then(res => console.log(res));

}

    module.exports = sendEmailTo;


// sendEmailTo('dylan.whitej@gmail.com', 'it works!');