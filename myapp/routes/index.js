var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req._remoteAddress);
    res.render('index', {
	hostname: process.env.HOSTNAME,
	ip: req._remoteAddress,
	host: req.headers.host,
	agent: req.headers['user-agent'],
    });
});

module.exports = router;
