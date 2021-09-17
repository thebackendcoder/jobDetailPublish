const model = require('../mongoSchema/mongoSchemas');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret;

async function shortlistProfile(req, res) {
    const { token, refId, employeeId } = req.body;
    try {
        const user = jwt.verify(token, jwtSecret);
        const id = user.id;
        const job = await model.generatedJob.findOne({ _id: refId });
        if (id == job.referedBy) {
            const dbResponse = await model.generatedJob.updateOne({ _id: refId, "appliedBy.userId": employeeId }, {
                $set: {
                    "appliedBy.$.currentlyShortlisted": true
                }
            });
            console.log(dbResponse);
            res.status(200).json({
                message: "you have successfully shortlisted the profile"
            })
        }
        else {
            res.status(400).json({
                "message": "you are not autherize to shortlist"
            })
        }
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = shortlistProfile;
