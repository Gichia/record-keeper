const express = require('express');
const connectDB = require('./config/db');

// Init express app
const app = express();

// Connect to db
connectDB();

const PORT = process.env.PORT || 5000;

/* 
    * Define App Routes
    * Using Express Middleware
*/
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/records', require('./routes/records'));

app.listen(PORT, () => console.log(`Server running on port: ${PORT}...`));
