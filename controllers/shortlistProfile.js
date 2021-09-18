const model = require('../mongoSchema/mongoSchemas');
const jwt = require('jsonwebtoken');
const mailServices = require('../services/generateMail');
const jwtSecret = process.env.jwtSecret;

async function shortlistProfile(req, res) {
    const { token, refId, employeeId } = req.body;
    try {
        const user = jwt.verify(token, jwtSecret);
        const id = user.id;
        const job = await model.generatedJob.findOne({ _id: refId })
        const emp= await model.credModel.findOne({_id: employeeId})
        const shortlistedEmp = emp.toObject();
        console.log(shortlistedEmp.email);
        if (id == job.referedBy) {
            const dbResponse = await model.generatedJob.updateOne({ _id: refId, "appliedBy.userId": employeeId }, {
                $set: {
                    "appliedBy.$.currentlyShortlisted": true
                }
            });
            //code to notify the user that profile has been shortlisted;
            let info = {
                email: user.username,
                jobRefId: refId
            }
           // console.log(dbResponse);
           const mailResponse = await mailServices(shortlistedEmp.email, info);
           console.log(mailResponse);
            res.status(200).json({
                message: "SuccessFully shortlisted ,Employee is been notified"
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
