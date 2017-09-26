var express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
    res.render('sub-home');
});

module.exports = router;