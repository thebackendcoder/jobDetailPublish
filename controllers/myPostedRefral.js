const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret;
const model = require('../mongoSchema/mongoSchemas');

async function postedReferal(req, res) {
    try {
        const { token } = req.body;
        const user = jwt.verify(token, jwtSecret);
        console.log(user);
        const userEmail = user.email;
        const allPostedJob = await model.generatedJob.find({ contactEmail : userEmail });
        res.send(allPostedJob);
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

module.exports = postedReferal;
