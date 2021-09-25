const model = require('../mongoSchema/mongoSchemas');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret;


async function applyJobs(req, res) {
    const { token, refralId } = req.body;
    try {
        const user = jwt.verify(token, jwtSecret);
        const userMail = user.email;
        const currentlyShortlisted = false
        const userDetail = {
            userMail,currentlyShortlisted
        }
        const job = await model.generatedJob.findById({ _id: refralId });
        let applied = []
        console.log(job.appliedBy)
        applied = job.appliedBy;
        applied.push(userDetail);
        const resp = await model.generatedJob.updateOne({
            _id: refralId
        }, {
            $set: {
                appliedBy: applied
            }
        })
        console.log(resp);
        res.status(200).json({
            "message": "Successfuly applied for the job, we will notify u once u r shortlisted"
        })
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

module.exports = applyJobs;
