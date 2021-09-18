const express = require('express');
const router = express.Router();

const postJob = require('./controllers/postJob');
const applyJob = require('./controllers/applyJobs');
const myPostedRefral = require('./controllers/myPostedRefral');
const appliedRefrel = require('./controllers/myAppliedRefral');
const getAppliedCandidate = require('./controllers/getAllCanditate');
const shortlistProfile = require('./controllers/shortlistProfile');

async function baseRoute(req, res) {
    res.status(200).json({
        message: "base route working"
    })
}
router.get('/', baseRoute);
router.post('/postJob', postJob);
router.post('/applyJob', applyJob);
router.post('/getMyPostedRefferal', myPostedRefral);
router.post('/appliedRefral', appliedRefrel);
router.post('/getAllCandidate', getAppliedCandidate);
router.post('/shortlistProfile', shortlistProfile);


module.exports = router;









