const express  = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const User = require('../models/users.model');

//  @route  POST api/users
//  @desc   Register new user endpoint
//  @access Public
router.post(
    '/', 
    [
        // Validation Checks
        check('name', 'Please add name').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
    ], 
    async (req, res) => {
        // Check for any errors in the request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            // Check if a user with provided email exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(409).json({ msg: 'User with that email already exists!' });
            };

            // Create a new user model / object
            user = new User({ name, email, password });

            // Create a salt and hash the provided text password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            // Save user to db
            await user.save();

            // User payload to be encoded in the token
            const payload = {
                user: {
                    id: user.id,
                }
            };

            // Create a jwt login token
            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000 }, (err, token) => {
                if (err) throw err;
                res.status(201).json({ msg: 'User created successfully', user: { id: user.id, name: user.name, email: user.email }, token, });
            });

        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: err.message });
        }


});


module.exports = router;
