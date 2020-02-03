const express = require('express');
const connectDB = require('./config/db');

// Init express app
const app = express();

// Connect to db
connectDB();

// Init Middleware
app.use(express.json({ extended: false, }));

app.get('/', (req, res) => {
    res.json({ msg: "Welcome to the RecordKepper API" });
});

/* 
* Define App Routes
*/
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/records', require('./routes/records'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}...`));
