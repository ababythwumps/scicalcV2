const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5173;

app.use(cors());
app.use(bodyParser.json());

app.post('/python', (req, res) => {
    const param = req.body.param;

    // Pass the parameter to the Python script
    exec('python pythoncode.py', {
        input: JSON.stringify({ param })  // This passes the input correctly
    }, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).send(`Error: ${error.message}`);
        }
        if (stderr) {
            return res.status(500).send(`stderr: ${stderr}`);
        }
        res.send(stdout.trim());  // Send the output back to the client
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
