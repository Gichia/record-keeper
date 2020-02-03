const express  = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/users.model');
const Record = require('../models/records.model');

//  @route  GET api/records
//  @desc   Get all user records
//  @access Private
router.get('/', auth, async (req, res) => {
    try {
        // Get all user records
        const records = await Record.find({ user: req.user.id }).sort({ date: -1 });

        res.status(200).json({ records });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: err.message });
    }
});

//  @route  POST api/records
//  @desc   Add new user record
//  @access Private
router.post('/', [ auth, [
    check('title', 'Please add a title for the record').not().isEmpty(),
    check('description', 'Please add a description for the record').not().isEmpty(),
] ], async (req, res) => {
    // Check for any errors in the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, dueDate, isCompleted, } = req.body;

    try {
        const newRecord = new Record({ 
            title, 
            description, 
            dueDate, 
            isCompleted, 
            user: req.user.id 
        });

        const record = await newRecord.save();

        res.status(201).json({  msg: 'Record successfully created', record });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: err.message });
    };

});

//  @route  PUT api/records/:id
//  @desc   Update existing user record
//  @access Private
router.put('/:id', [auth, [
    check('title', 'Please add a title for the record').not().isEmpty(),
    check('description', 'Please add a description for the record').not().isEmpty(),
] ], async (req, res) => {
    // Check for any errors in the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, dueDate, isCompleted, } = req.body;

    res.json({ msg: 'Updated record' })
});

//  @route  DELETE api/records
//  @desc   Delete user record
//  @access Private
router.delete('/:id', (req, res) => {
    res.json({ msg: 'Delete a record' })
});


module.exports = router;