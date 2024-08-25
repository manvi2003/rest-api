const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true 
}));

// Mock data
const userId = "ishika0305";
const email = "ishika.gupta2021@vitstudent.ac.in";
const rollNumber = "21BAI1342";

// POST /api/userdata endpoint
app.post('/api/userdata', (req, res) => {
    const { data } = req.body;

    if (!Array.isArray(data)) {
        return res.status(400).json({ "is success": false, message: 'Data should be an array' });
    }

    // Filter and process the data
    const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
    const lowercaseAlphabets = alphabets.filter(char => char === char.toLowerCase());

    // Get the highest lowercase alphabet
    const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 ? lowercaseAlphabets.sort().pop() : null;

    // Respond with the processed data
    const response = {
        "is success": true,
        "user id": userId,
        "email": email,
        "roll number": rollNumber,
        "alphabets": alphabets.join(', '),
        "highest lowercase alphabet": highestLowercaseAlphabet
    };

    res.json(response);
});

// GET /api/userdata endpoint
app.get('/api/userdata', (req, res) => {
    res.json({ operationCode: 1001 });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});