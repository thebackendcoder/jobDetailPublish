const AWS = require('aws-sdk');
const SES = new AWS.SES({
    region: 'ap-south-1',
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
});

async function sendMail(recieverMail, data) {
    const sourceMail = process.env.senderMail
    // const verifyLink = `${process.env.baseUrl}/verifyEmail/?token=${token}`;
    const params = {
        Destination: {
            ToAddresses: [recieverMail],
        },
        Message: {
            Body: {
                Text: {
                    Data: `Please find the contact detail of the employee 
                                EMAIL: ${data.email},
                                jobRefId: ${data.jobRefId}`
                },
            },
            Subject: { Data: "Congrats, your profile has been shortlisted for the refrel" },
        },
        Source: sourceMail
    }
    try {
        const sesResponse = await SES.sendEmail(params).promise();
        console.log(sesResponse);
        return sesResponse;
    }
    catch (err) {
        console.log("there was an error sending the mail", err);
        throw err;
    }
}

module.exports = sendMail

