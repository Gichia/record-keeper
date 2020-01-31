const express  = require('express');
const router = express.Router();

//  @route  GET api/records
//  @desc   Get all user records
//  @access Private
router.get('/', (req, res) => {
    res.json({ msg: 'Get all user records' })
});

//  @route  POST api/records
//  @desc   Add new user record
//  @access Private
router.post('/', (req, res) => {
    res.json({ msg: 'Add record' })
});

//  @route  PUT api/records/:id
//  @desc   Update existing user record
//  @access Private
router.put('/:id', (req, res) => {
    res.json({ msg: 'Update record' })
});

//  @route  DELETE api/records
//  @desc   Delete user record
//  @access Private
router.delete('/:id', (req, res) => {
    res.json({ msg: 'Delete a record' })
});


module.exports = router;