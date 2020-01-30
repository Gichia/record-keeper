const express = require('express');

// Init express app
const app = express();

const PORT = process.env.PORT || 5000;

// App routes
app.get('/', (req, res) => {
    res.json({ msg: 'Hello There' })
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}...`));
