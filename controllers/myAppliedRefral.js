const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret;
const model = require('../mongoSchema/mongoSchemas');

async function appliedReferal(req, res) {
    try {
        const { token } = req.body;
        const user = jwt.verify(token, jwtSecret);
        console.log(user);
        const userMail = user.email
        console.log(userMail)
        const allAppliedJob = await model.generatedJob.find({ "appliedBy.userMail": userMail });

        const Resp = allAppliedJob.map((val) => {
            let employee;
            val.appliedBy.filter((emp) => {
                if (emp.userMail == userMail) {
                    employee = emp;
                }
            })
            const ob = {
                "Reffral Id": val._id,
                "Post": val.post,
                "company": val.company,
                "JobDescription": val.jobDescription,
                "Status": employee.currentlyShortlisted
            }
            return ob;
        })
        res.send(Resp);
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

module.exports = appliedReferal;







