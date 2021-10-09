var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    msg = {
	hostname: process.env.HOSTNAME,
	ip: req._remoteAddress,
	host: req.headers.host,
	agent: req.headers['user-agent'],
    }	
    res.send(msg);
});

module.exports = router;
