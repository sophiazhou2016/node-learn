var express = require('express');
var router = express.Router();

router.post('/login', function(req, res, next) {
    const { username, password } = req.body;
    res.json({
        errno: 0,
        data: {
            username,
            password
        }
    });
});

router.get('/session-test', (req, res, next) => {
    const session = req.session;
    if(session.viewNum == null) {
        session.viewNum = 0;
    }
    session.viewNum ++;
    res.json({
        viewNum: session.viewNum
    });
})

module.exports = router;
