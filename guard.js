const port = 4720;


const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');

app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

let guards = [];

app.get('/points', (req, res) => {
    res.json(guards);
});

app.post('/add-point', (req, res) => {
    const { pointName, location } = req.body;

    const newPoint = { id: guards.length + 1, pointName, location };
    guards.push(newPoint);

    res.status(200).json({ message: 'Guard point added successfully', point: newPoint });
});






app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
