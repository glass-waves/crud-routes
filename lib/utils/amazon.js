require('dotenv').config();
const { LexModelBuildingService } = require('aws-sdk');
const SES = require('aws-sdk/clients/ses');

// AWS.config.update({region: 'REGION'});

const sendEmailTo = (email, message) => {
    
    const params = {
        Destination: {
            /* required */
            CcAddresses: [
            ],
            ToAddresses: [
                `${email}`,
                /* more items */
            ],  
        },
        Message: {
            /* required */
            Body: {
                /* required */
                Html: {
                    Charset: 'UTF-8',
                    Data: `${message}`,
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

    const response = new SES(SESconfig).sendEmail(params).promise();
}

    module.exports = sendEmailTo;
