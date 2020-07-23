const express = require('express');
const router = express();
const { wrapper, success } = require('./../utility');
module.exports = router;

// get the user information with the id
// (msg) -> ()
router.post('/debug', wrapper(async (req, res) => {
    console.log(req.body.msg);
    res.send(success({}));
}));

