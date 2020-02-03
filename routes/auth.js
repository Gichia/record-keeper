const express  = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');

const router = express.Router();
const User = require('../models/users.model');

//  @route  GET api/auth
//  @desc   Get logged in user
//  @access Private
router.get('/', auth, async (req, res) => {
    try {
        // Get user from db using the user from token payload
        const user = await User.findById(req.user.id);

        // Return user
        res.status(200).json({ user });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: err.message });
    }
});

//  @route  POST api/auth
//  @desc   Authenticate user & get token
//  @access Public
router.post(
    '/', 
    [
        check('email', 'Please provide your account email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        // Check for any errors in the request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // Check if a user with that email exists
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ msg: 'Invalid login credentials' });
            };

            // Check if password is correct
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ msg: 'Invalid login credentials' });
            };

            // User payload to be encoded in the token
            const payload = {
                user: {
                    id: user.id
                }
            };

            // Create a jwt login token
            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000 }, (err, token) => {
                if (err) throw err;
                res.status(200).json({ msg: 'User successfully authenticated', token, });
            });

        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: err.message });
        }
});


module.exports = router;