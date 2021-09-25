const model = require('../mongoSchema/mongoSchemas');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret;

async function postJob(req, res) {

    const { token, post, company, contactNumber, contactEmail, jobDescription } = req.body;
    try {
        const user = jwt.verify(token, jwtSecret);
        console.log(user)
        const userMail = user.email;
        console.log(userMail)
        if (userMail != contactEmail) {
            res.status(400).json({
                message: "The email provided doesnt match your registed email Id, Please update your profile"
            })
        } else {
            const dbResponse = await model.generatedJob.create({
                post,
                company,
                contactEmail,
                contactNumber,
                jobDescription,
                referedBy: userMail
            })
            console.log(dbResponse);
            res.status(200).json({
                message: "referal Succcessfully Posted, we will notify you once some one applies for it"
            })
        }
    }
    catch (err) {
        console.log(err)
        if (err.message === 'invalid signature') {
            res.status(400).json({
                message: 'in valid token'
            })
        }
        if (err.message === 'jwt expired') {
            res.status(400).json({
                message: 'token Expired'
            })
        } else {
            res.status(400).json({
                message: err
            })
        }
    }

}


module.exports = postJob;






