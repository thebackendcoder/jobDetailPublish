const mongoose = require('mongoose');

const userCred = new mongoose.Schema({}, { collection: "usercredential" });

const Job = new mongoose.Schema({

    post: { type: String, required: true },
    company: { type: String, required: true },
    contactEmail:{type: String, required: true},
    contactNumber: { type: Number, required: true },
    jobDescription: { type: String, required: true },
    referedBy: {type: String, required: true },
    appliedBy:{type: Array},
    
}, { collection: "availableJobs" });

const credModel = mongoose.model('usercredential', userCred);
const generatedJob = mongoose.model('availableJobs', Job);

module.exports = {
    credModel, generatedJob
}