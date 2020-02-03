/**
 * Custom auth middleware for 
 * token authorization and decoding
 */
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    // Get token from headers
    const token = req.header('x-auth-token');

    // Check for token in headers
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    };

    try {
        // Verify and decode the jwt token
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        // Assign user object from jwt token payload
        req.user = decoded.user;

        // Call next to move on
        next();

    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }

};
