const express  = require('express');
const router = express.Router();

//  @route  POST api/users
//  @desc   Register new user endpoint
//  @access Public
router.post('/', (req, res) => {
    res.json({ msg: 'Register new user' })
});


module.exports = router;
