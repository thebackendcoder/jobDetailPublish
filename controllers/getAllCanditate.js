const model = require('../mongoSchema/mongoSchemas');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret;

async function getAllCandidate(req, res) {

    const { token, refId } = req.body;
    try {
        const user = jwt.verify(token, jwtSecret);
        const email = user.email;

        const job = await model.generatedJob.findOne({ _id: refId });
        console.log(email)
        console.log(job.contactEmail)
        if (email == job.contactEmail) {
            let appliedCandidate = job.appliedBy;
            res.send(appliedCandidate);
        }
        else {
            res.status(404).json({
                message: "not autherize"
            })
        }
    }
    catch (err) {
        res.status(400).json({
            message: err
        })
    }

}

module.exports = getAllCandidate;
